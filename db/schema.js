var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.promise = global.promise;

var ApplicationSchema = new Schema({
    name: String,
    logo: String,
    downloadUrl: String,
    description: String
});

var CompanySchema = new Schema({
    name: String,
    applications: [ApplicationSchema]
});

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    favorite: [ApplicationSchema]
});

UserSchema.index({email: 1, type: -1});

ApplicationSchema.pre('save', (next) => {
    now = new Date();
    this.update_at = now;

    if(!this.created_at) {this.created_at = now}
        next();
});

CompanySchema.pre('save', (next) => {
    now = new Date();
    this.updated_at = now;

    if(!this.created_at) {this.created_at = now}
        next();
});

UserSchema.pre('save', (next) => {
    now = new Date();
    this.update_at = now;

    if(!this.created_at) {this.created_at = now}
        next();
});

var CompanyModel = mongoose.model('Company', CompanySchema);

var UserModel = mongoose.model('User', UserSchema);

var ApplicationModel = mongoose.model('App', ApplicationSchema);

module.exports = {
    User: UserModel,
    Application: ApplicationModel,
    Company: CompanyModel
};