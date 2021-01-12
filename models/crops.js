const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    hardiness: {
        type: String
    },
    varieties: [{
        title: String,
        description: String
    }],
    sowing: {
        preparation: String,
        undercover: String,
        direct: String,
        latest: String,
        depth: String,
        info: String
    },
    spacing: {
        row: Number,
        interval: Number,
        units: String
    },
    transplanting : {
        from: String
    },
    growing: {
        general: String,
        feeding: String,
        pollination: String
    },
    harvesting: {
        maturity: {
            min_days: Number,
            max_days: Number
        },
        when: String,
        method: String,
        storage : String
    },
    problems: {
        pests: [{
            pest : String,
            identification: String,
            mitigation: String
        }], 
        diseases : [{
            disease:  String,
            identification: String,
            mitigation: String
        }]
    }
}, {timestamps: true});

// Note - name is unpluralised version of the collection on mongoDB
const Crop = mongoose.model('crop', CropSchema);
module.exports = Crop;