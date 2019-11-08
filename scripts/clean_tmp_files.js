const schedule = require('node-schedule');
const cloudinary = require('cloudinary').v2;

const rule = new schedule.RecurrenceRule();
rule.hour = 24; // clean at 4am
rule.minute = 0;

function scheduleInit() {
  console.log('******** schedule ********')
  schedule.scheduleJob(rule, function () {
    cloudinary.api.delete_resources_by_tag('tmp', function(err, result) {
      if (err) console.log(err)
      console.log(result.deleted)
      for (const key in result.deleted) {
        console.log(`tmp file ${key} ${result.deleted[key]}`);
      }
    })
  });
}

module.exports = {
  scheduleInit
};