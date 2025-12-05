import { ErrorHandler, Injectable } from "@angular/core";
import { LoggingService } from "@shared/services/logging.service";


@Injectable()
export class GlobalErrorHandle implements ErrorHandler{
    constructor(private loggingService: LoggingService){}

    handleError(error: any): void {
        this.loggingService.logError(error);
        console.error('GlobalErrorHandler capture el error:',error);

    }
}