import { Injectable } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules } from './app.cachedependencyrules';
import { Util } from './app.utils';
import { StandardFunctions } from './standardFunctions';

/**
 * « Conditional navigation manager »
 * Handles all conditional navigation defined in the model
 */
@Injectable({providedIn: 'root'})
export class ConditionalNavigationMng {

    /** Cache for queries */
    private queriesCache: CacheDependencyRules;

    constructor(private appGlobalInfo: AppGlobalInfo, private util: Util, private stdFun: StandardFunctions) {
        this.queriesCache = new CacheDependencyRules(this.appGlobalInfo, this.util);
     }

    /**
     * Process the conditional navigation
     * @param className Class name
     * @param serviceName Executed service
     * @param request Service request
     * @param response Service response
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    public processConditionalNavigation(className: string, serviceName: string, request: any, response: any, previousContext: any,
                                        comeBackContext: any): boolean {

        this.appGlobalInfo.appExchangeInfo.clearConditionalNavigation();

        return false;
    }
}
