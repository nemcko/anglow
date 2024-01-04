import { IPerson } from './../../src/app/persons/persons.model';
import { JSONPreset } from '../../node_modules/lowdb/lib/presets/node.js'
export { IPerson } from './../../src/app/persons/persons.model';
export { FilterData, IRequestData, IResponseData } from '../../src/app/core/models/datapage.model'

export type Database = {
    persons: Array<IPerson>;
}

export class LowDbAdapter {

    constructor(
        private _db: any = {}
    ) { }

    public async useDb(dbname: string) {
        const defaultData: Database = { persons: [] }
        const db = await JSONPreset(`srv/db/${dbname}.json`, defaultData);
        return this._db = db;
    };

    public allObjects(colname: string) {
        return this._db.data[colname].find((item: any) => item.id !== null)
    }

    public findObjectById(colname: string, id: number) {
        return this._db.data[colname].find((item: any) => item.id === id)
    }

    public async createObject(colname: string, data: any) {
        const item = data
        let fields = this._db.data[colname]
        item.id = (fields.length ? fields[fields.length - 1].id + 1 : 1)
        this._db.data[colname].push(item)
        await this._db.write()
        return item
    }

    public async saveObjectById(colname: string, id: number, data: any) {
        // console.log('LowDbAdapter.saveObjectById:', id, data)
        let fields = this._db.data[colname]
        const index = fields.findIndex((f: any) => id === f.id);
        data.id = id
        if (-1 === index) {
            this._db.data[colname] = [...fields, data];
        } else {
            this._db.data[colname] = [...fields.slice(0, index), data, ...fields.slice(index + 1)];
        }
        await this._db.write()
        return data
    };

    public async deleteObjectById(colname: string, id: number) {
        let fields = this._db.data[colname]
        const index = fields.findIndex((f: any) => id === f.id);
        if (-1 !== index) {
            this._db.data[colname] = [...fields.slice(0, index), ...fields.slice(index + 1)];
            await this._db.write()
            // console.log('LowDbAdapter.deleteObjectById:', id)
            return true
        }
        return false
    };

    protected get iniResult(): {
        items: any[],
        total: number
    } {
        return {
            items: [],
            total: 0
        }
    }

    public list(req: any, res: any, colname: string) {
        const items = this.iniResult
        this._db.data[colname].forEach((item: any) => {
            items.items.push(Object.assign({}, item));
            items.total++;
        })
        res.send(items)
    }

    public paginate(req: any, res: any, colname: string, fields: string = '', filtermap: any = null, resfn: any = null) {

        const items = this.iniResult
        const isObject = (a: any) => {
            return (!!a) && (a.constructor === Object);
        };

        const getValue = (item: any, obj: object, propath: string) => {
            let expand = (str: string, val = {}) => {
                return str.split('.').reduceRight((acc, currentValue) => {
                    return { [currentValue]: acc }
                }, val)
            }
            // @ts-ignore
            let objVal = (obj: object, keys: string) => keys.split('.').reduce((o, k) => (o || {})[k], obj);
            return expand(propath, objVal(item, propath));
        }


        const findValue = (item: any, propName: string, propValue: string) => {
            let aProps = Object.getOwnPropertyNames(item);
            for (let i = 0; i < aProps.length; i++) {
                if (item[propName] && item[propName].indexOf(propValue) >= 0) {
                    return true;
                }
            }
            return false;
        }

        const matches = (item: any, filt: any) => {
            let filterIsEmpty = true;
            for (let key in filt) {
                filterIsEmpty = false;
                if (!isObject(filt[key])) {
                    if (findValue(item, key, filt[key]) || filt[key] === '') {
                        return true;
                    }
                }
            }
            return filterIsEmpty;
        }

        const filtmap = (fields ?
            (filtermap ? filtermap :
                fields.split(",").reduce((acc: any, elem) => {
                    acc[elem] = elem
                    return acc
                }, {})
            ) : null
        )

        let filterObject: object;
        if (filtmap) {
            let fo = Object.keys(req.body.filter).map(name => {
                return { [filtmap[name]]: req.body.filter[name] };
            }).reduce((fobj, item) => {
                return fobj = { ...fobj, ...item };
            }, {});
            filterObject = fo;
        } else {
            filterObject = req.body.filter;
        }

        let query = this._db.data[colname].filter((item: any) => matches(item, filterObject))
        let { pageOffset, pageSize } = req.body;
        let pid = 0;
        pageOffset = parseInt(pageOffset) + 1;
        pageSize = parseInt(pageSize);

        query.forEach((item: any) => {
            ++pid;
            if ((pid > (pageOffset - 1) * pageSize) && (pid <= pageOffset * pageSize)) {
                if (fields) {
                    let row = fields.split(",").reduce((itm, fld) => {
                        let val = getValue(item, itm, fld);
                        let temp = Object.assign({}, itm, val)
                        Object.keys(temp).forEach(key => {
                            // @ts-ignore
                            temp[key] = (typeof temp[key] === 'object') ? Object.assign(temp[key], itm[key], val[key]) : temp[key];
                        })
                        return temp;
                    }, {});
                    items.items.push(row);
                } else {
                    items.items.push(Object.assign({}, item));
                }
            }
            items.total++;
        })
        if (resfn) {
            return resfn(req, res, items);
        } else {
            res.send(items)
        }
    };
}

export const lowDbAdapter = new LowDbAdapter()