const app = require('./app');
const nconf = require('./config/nconf');

app.set('port', nconf.get('port'));

app.listen(nconf.get('port'), (err) => {
    if (err) {
        console.log('Some Error Happend');
    } console.log(`Server is Listening port ${nconf.get('port')}`);
});
