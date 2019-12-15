const CronJob = require('cron').CronJob;
const cloudinary = require('cloudinary').v2;

function scheduleInit() {
  console.log('******** schedule ********')
  new CronJob('*/25 * * * * *', () => {
    cloudinary.api.delete_resources_by_tag('tmp', function(err, result) {
      if (err) console.log(err)
      console.log(result.deleted)
      for (const key in result.deleted) {
        console.log(`tmp file ${key} ${result.deleted[key]}`);
      }
    })
  }, () => {
    console.log('cron job error')
  }, true);
}

module.exports = {
  scheduleInit
};