import * as NeDB from 'nedb';
import { DataDocument } from './game-data';
import * as Data from './game-data';

@Data.data
export class AccountDocument extends DataDocument implements Odyssey.Account {
  @Data.trackProperty(true)
  username: string;

  @Data.trackProperty(true)
  password: string;

  @Data.trackProperty(true)
  access: number;

  @Data.trackProperty(true)
  email?: string;

  protected constructor(protected data: NeDB, readonly _id, username, password, access, email?) {
    super();

    this.username = username;
    this.password = password;
    this.access = access;
    this.email = email;
    this._id = _id;

    this.clearChanges();
  }
}

export interface AccountDataManagerInterface {
  createAccount(username: string, cryptPassword: string): Promise<AccountDocument>,
  getAccount(username: string): Promise<AccountDocument>
}

export class AccountDataManager implements AccountDataManagerInterface {
  private data: NeDB;
  private accounts: { [username: string]: AccountDocument } = {};

  constructor(dataFile: string) {
    let options: NeDB.DataStoreOptions = {
      filename: dataFile,
      autoload: true
    }
    this.data = new NeDB(options);

    this.data.ensureIndex({
      fieldName: 'username',
      unique: true,
      sparse: false
    });
  }

  async createAccount(username: string, cryptPassword: string, email?: string): Promise<AccountDocument> {
    return new Promise<AccountDocument>((resolve, reject) => {
      this.data.insert({
        username: username,
        password: cryptPassword,
        access: 0,
        email: email
      }, (err, account: any) => {
        if (err) {
          return reject(err);
        }

        let newAccount = new ConcreteAccount(this.data, account._id, account.username, account.password, account.access, account.email);
        this.accounts[account.username] = newAccount;

        resolve(newAccount);
      });
    })
  }

  async getAccount(username: string): Promise<AccountDocument> {
    return new Promise<AccountDocument>((resolve, reject) => {
      if (this.accounts[username]) {
        return resolve(this.accounts[username]);
      }

      this.data.findOne({ username: username }, (err, account: AccountDocument) => {
        let newAccount = new ConcreteAccount(this.data, account._id, account.username, account.password, account.access, account.email);
        this.accounts[account.username] = newAccount;
        resolve(newAccount);
      });
    })
  }
}

/**
 * Private implementation for Factory Pattern
 *
 * @class ConcreteAccount
 * @extends {AccountDocument}
 */
class ConcreteAccount extends AccountDocument {
  constructor(data: NeDB, _id, username, password, access, email?) {
    super(data, _id, username, password, access, email);
  }
}
