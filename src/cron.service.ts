import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class CronService {
    constructor(private readonly appService: AppService) {}
  // Run every day at midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleDailyTask() {
    console.log('Running daily task at midnight');
    // Add your daily task logic here
  }

  // Run every hour
  @Cron(CronExpression.EVERY_HOUR)
  handleHourlyTask() {
    console.log('Running hourly task');
    // Add your hourly task logic here
  }

  // Run every 5 minutes
  @Cron('*/5 * * * *')
  handleFiveMinuteTask() {
    this.appService.getContractDueDate();
    console.log('Running task every 5 minutes');
    // Add your 5-minute task logic here
  }

  // Run on specific days (e.g., Monday and Friday at 9:00 AM)
  @Cron('0 9 * * 1,5')
  handleSpecificDaysTask() {
    console.log('Running task on Monday and Friday at 9:00 AM');
    // Add your specific days task logic here
  }

} 