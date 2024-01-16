/* API NOT IN USE CURRENTLY */
// API URL: https://timeapi.io/api/Conversion/ConvertTimeZone

import moment from 'moment-timezone';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { timezones } from './timezones.js';
import { questions } from './questions.js';

// TODO: Rewrite the conversions to ONE function

export const handleTimeConversion = async () => {
  const answers = await inquirer.prompt(questions);
  const { time, sourceTimeZone } = answers;
  const targetTimeZone = 'America/New_York'; // Replace with your source timezone || Leave as default (In my case always convert to EST)

  // Check their is valid input
  if (!time || !sourceTimeZone) {
    return `Make sure you supply a time and a timezone to convert from.`;
  }

  // Get the full name of timezones (Moment works best with full names)
  const getFullTimeZoneName = timezones.filter(
    (zone) => zone.abbr === sourceTimeZone
  );

  const fullTimeZoneName = getFullTimeZoneName[0].full;

  // UTC & MST works different in moment (handle it here)
  if (sourceTimeZone === 'UTC') {
    const convertedTimeInfo = convertUTCTimeToEST(time);

    return console.log(
      `UTC converted to EST: ${chalk.green(convertedTimeInfo.convertedTime)}`
    );
  }
  if (sourceTimeZone === 'MST') {
    const convertedTimeInfo = convertMSTtoEST(time);

    return console.log(
      `MST converted to EST: ${chalk.green(convertedTimeInfo.convertedTime)}`
    );
  }

  // Convert time
  const convertedTimes = convertTimeMoment(
    time,
    fullTimeZoneName,
    targetTimeZone
  );

  // Display result
  console.log(
    `${sourceTimeZone} Time: ${chalk.blue(
      convertedTimes.sourceTime
    )}  => EST Time: ${chalk.green(convertedTimes.targetTime)}`
  );
};

const convertTimeMoment = (time, sourceTimezone, targetTimezone) => {
  console.log(`time = `, time);
  // Parse the input time string
  const inputTime = moment(time, 'hh:mm A');
  console.log(`inputTime = `, inputTime);

  // Check if DST is in effect for source timezone
  const isSourceDST = inputTime.clone().tz(sourceTimezone).isDST();

  // Check if DST is in effect for target timezone
  const isTargetDST = inputTime.clone().tz(targetTimezone).isDST();

  // Set the source timezone with DST adjustment
  const sourceTime = inputTime
    .clone()
    .tz(sourceTimezone)
    .format(`hh:mm A [${isSourceDST ? 'DST' : 'Standard Time'}]`);

  // Set the target timezone with DST adjustment
  const targetTime = inputTime
    .clone()
    .tz(targetTimezone)
    .format(`hh:mm A [${isTargetDST ? 'DST' : 'Standard Time'}]`);

  return {
    sourceTime,
    targetTime,
  };
};

const convertUTCTimeToEST = (utcTime) => {
  // Parse the input UTC time string
  const inputTime = moment.utc(utcTime, 'HH:mm');

  // Set the source timezone as UTC
  const sourceTimezone = 'UTC';

  // Set the target timezone as Eastern Standard Time (EST)
  const targetTimezone = 'America/New_York';

  // Check if DST is in effect for the target timezone
  const isTargetDST = inputTime.clone().tz(targetTimezone).isDST();

  // Set the target timezone with DST adjustment
  const convertedTime = inputTime
    .clone()
    .tz(targetTimezone)
    .format(`hh:mm A [${isTargetDST ? 'DST' : 'Standard Time'}]`);

  return {
    convertedTime,
  };
};

function convertMSTtoEST(mstTime) {
  // Parse the input MST time string
  const inputTime = moment.tz(mstTime, 'HH:mm', 'America/Denver');

  // Set the source timezone as Mountain Standard Time (MST)
  const sourceTimezone = 'America/Denver';

  // Set the target timezone as Eastern Standard Time (EST)
  const targetTimezone = 'America/New_York';

  // Check if DST is in effect for the target timezone
  const isTargetDST = inputTime.clone().tz(targetTimezone).isDST();

  // Set the target timezone with DST adjustment
  const convertedTime = inputTime
    .clone()
    .tz(targetTimezone)
    .format(`hh:mm A [${isTargetDST ? 'DST' : 'Standard Time'}]`);

  return {
    convertedTime,
  };
}

// -----------------------------------------------------------------
// Might use later if I refactor
// const getOffset = (desiredTimeZone) => {
//   const obj = timezones.filter((zone) => zone.abbr === desiredTimeZone);
//   console.log(`obj`, obj);

//   const { offset } = obj[0];

//   return offset;
// };
