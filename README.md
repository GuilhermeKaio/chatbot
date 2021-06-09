# Chatbot

### A chatbot that simulates financial transactions

## How to setup
### frontend
  ```bash
  cd .\frontend\
  npm i
  npm run
  ```
  
### backend
```bash
cd .\backend\
npm i
node .\src\index.js
```
write a file on ``.\backend\src\config\`` with the name ``auth.json`` with:
```json
{
    "secret": <Secret_for_JWT>,
    "apiKey": <API_KEY_from_https://www.amdoren.com/currency-api/>,
    "DB_URL": <Url_Mongo>
}
```
## Commands
- ``Login <Email> <Password>``: Login in your account
- ``Register <Email> <Password> <Currency Code>``: Login in your account
- ``Balance``: Show your Balance
- ``Deposit <Number>``: Deposit in you account
- ``Withdraw <Number>``: Withdraw from your account
- ``Exchange <Currency Code> <Currency Code>``: Change currency code from your account
