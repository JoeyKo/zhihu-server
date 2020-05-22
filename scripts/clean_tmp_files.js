const fs = require('fs');
const CronJob = require('cron').CronJob;

const dir = 'uploads/tmp';

function scheduleInit() {
  console.log('******** schedule ********')
  new CronJob('0 0 1 * * *', () => {
    try {
      fs.rmdirSync(dir, { recursive: true });
      console.log(`${dir} is deleted!`);
    } catch (err) {
      console.error(`Error while deleting ${dir}.`);
    }
  }, () => {
    console.log('cron job error')
  }, true);
}

module.exports = {
  scheduleInit
};