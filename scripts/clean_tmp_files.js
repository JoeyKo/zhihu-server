const CronJob = require('cron').CronJob;

function scheduleInit() {
  console.log('******** schedule ********')
  new CronJob('*/25 * * * * *', () => {
  
  }, () => {
    console.log('cron job error')
  }, true);
}

module.exports = {
  scheduleInit
};