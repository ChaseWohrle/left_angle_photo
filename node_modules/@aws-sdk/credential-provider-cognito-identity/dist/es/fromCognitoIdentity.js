import { __awaiter, __generator } from "tslib";
import { GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity";
import { ProviderError } from "@aws-sdk/property-provider";
import { resolveLogins } from "./resolveLogins";
/**
 * Retrieves temporary AWS credentials using Amazon Cognito's
 * `GetCredentialsForIdentity` operation.
 *
 * Results from this function call are not cached internally.
 */
export function fromCognitoIdentity(parameters) {
    var _this = this;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, AccessKeyId, Expiration, _d, SecretKey, SessionToken, _e, _f, _g, _h;
        var _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _f = (_e = parameters.client).send;
                    _g = GetCredentialsForIdentityCommand.bind;
                    _j = {
                        CustomRoleArn: parameters.customRoleArn,
                        IdentityId: parameters.identityId
                    };
                    if (!parameters.logins) return [3 /*break*/, 2];
                    return [4 /*yield*/, resolveLogins(parameters.logins)];
                case 1:
                    _h = _k.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _h = undefined;
                    _k.label = 3;
                case 3: return [4 /*yield*/, _f.apply(_e, [new (_g.apply(GetCredentialsForIdentityCommand, [void 0, (_j.Logins = _h,
                                _j)]))()])];
                case 4:
                    _a = (_k.sent()).Credentials, _b = _a === void 0 ? throwOnMissingCredentials() : _a, _c = _b.AccessKeyId, AccessKeyId = _c === void 0 ? throwOnMissingAccessKeyId() : _c, Expiration = _b.Expiration, _d = _b.SecretKey, SecretKey = _d === void 0 ? throwOnMissingSecretKey() : _d, SessionToken = _b.SessionToken;
                    return [2 /*return*/, {
                            identityId: parameters.identityId,
                            accessKeyId: AccessKeyId,
                            secretAccessKey: SecretKey,
                            sessionToken: SessionToken,
                            expiration: Expiration,
                        }];
            }
        });
    }); };
}
function throwOnMissingAccessKeyId() {
    throw new ProviderError("Response from Amazon Cognito contained no access key ID");
}
function throwOnMissingCredentials() {
    throw new ProviderError("Response from Amazon Cognito contained no credentials");
}
function throwOnMissingSecretKey() {
    throw new ProviderError("Response from Amazon Cognito contained no secret key");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUNvZ25pdG9JZGVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mcm9tQ29nbml0b0lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBV2hEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFVBQXlDO0lBQTdFLGlCQXlCQztJQXhCQyxPQUFPOzs7Ozs7b0JBUUssS0FBQSxDQUFBLEtBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQTt5QkFDMUIsZ0NBQWdDOzt3QkFDbEMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxhQUFhO3dCQUN2QyxVQUFVLEVBQUUsVUFBVSxDQUFDLFVBQVU7O3lCQUN6QixVQUFVLENBQUMsTUFBTSxFQUFqQix3QkFBaUI7b0JBQUcscUJBQU0sYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQTs7b0JBQXRDLEtBQUEsU0FBc0MsQ0FBQTs7O29CQUFHLEtBQUEsU0FBUyxDQUFBOzt3QkFKOUUscUJBQU0sY0FDUixjQUFJLGdDQUFnQyxZQUdsQyxTQUFNLEtBQXdFO3dDQUM5RSxFQUNILEVBQUE7O29CQVpDLEtBTUUsQ0FBQSxTQU1ILENBQUEsWUFQZ0MsRUFML0IscUJBS0kseUJBQXlCLEVBQUUsS0FBQSxFQUo3QixtQkFBeUMsRUFBekMsV0FBVyxtQkFBRyx5QkFBeUIsRUFBRSxLQUFBLEVBQ3pDLFVBQVUsZ0JBQUEsRUFDVixpQkFBcUMsRUFBckMsU0FBUyxtQkFBRyx1QkFBdUIsRUFBRSxLQUFBLEVBQ3JDLFlBQVksa0JBQUE7b0JBVWhCLHNCQUFPOzRCQUNMLFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVTs0QkFDakMsV0FBVyxFQUFFLFdBQVc7NEJBQ3hCLGVBQWUsRUFBRSxTQUFTOzRCQUMxQixZQUFZLEVBQUUsWUFBWTs0QkFDMUIsVUFBVSxFQUFFLFVBQVU7eUJBQ3ZCLEVBQUM7OztTQUNILENBQUM7QUFDSixDQUFDO0FBVUQsU0FBUyx5QkFBeUI7SUFDaEMsTUFBTSxJQUFJLGFBQWEsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7QUFFRCxTQUFTLHlCQUF5QjtJQUNoQyxNQUFNLElBQUksYUFBYSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUVELFNBQVMsdUJBQXVCO0lBQzlCLE1BQU0sSUFBSSxhQUFhLENBQUMsc0RBQXNELENBQUMsQ0FBQztBQUNsRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2V0Q3JlZGVudGlhbHNGb3JJZGVudGl0eUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWNvZ25pdG8taWRlbnRpdHlcIjtcbmltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7IENyZWRlbnRpYWxzLCBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBDb2duaXRvUHJvdmlkZXJQYXJhbWV0ZXJzIH0gZnJvbSBcIi4vQ29nbml0b1Byb3ZpZGVyUGFyYW1ldGVyc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUxvZ2lucyB9IGZyb20gXCIuL3Jlc29sdmVMb2dpbnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb2duaXRvSWRlbnRpdHlDcmVkZW50aWFscyBleHRlbmRzIENyZWRlbnRpYWxzIHtcbiAgLyoqXG4gICAqIFRoZSBDb2duaXRvIElEIHJldHVybmVkIGJ5IHRoZSBsYXN0IGNhbGwgdG8gQVdTLkNvZ25pdG9JZGVudGl0eS5nZXRPcGVuSWRUb2tlbigpLlxuICAgKi9cbiAgaWRlbnRpdHlJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDb2duaXRvSWRlbnRpdHlDcmVkZW50aWFsUHJvdmlkZXIgPSBQcm92aWRlcjxDb2duaXRvSWRlbnRpdHlDcmVkZW50aWFscz47XG5cbi8qKlxuICogUmV0cmlldmVzIHRlbXBvcmFyeSBBV1MgY3JlZGVudGlhbHMgdXNpbmcgQW1hem9uIENvZ25pdG8nc1xuICogYEdldENyZWRlbnRpYWxzRm9ySWRlbnRpdHlgIG9wZXJhdGlvbi5cbiAqXG4gKiBSZXN1bHRzIGZyb20gdGhpcyBmdW5jdGlvbiBjYWxsIGFyZSBub3QgY2FjaGVkIGludGVybmFsbHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQ29nbml0b0lkZW50aXR5KHBhcmFtZXRlcnM6IEZyb21Db2duaXRvSWRlbnRpdHlQYXJhbWV0ZXJzKTogQ29nbml0b0lkZW50aXR5Q3JlZGVudGlhbFByb3ZpZGVyIHtcbiAgcmV0dXJuIGFzeW5jICgpOiBQcm9taXNlPENvZ25pdG9JZGVudGl0eUNyZWRlbnRpYWxzPiA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgQ3JlZGVudGlhbHM6IHtcbiAgICAgICAgQWNjZXNzS2V5SWQgPSB0aHJvd09uTWlzc2luZ0FjY2Vzc0tleUlkKCksXG4gICAgICAgIEV4cGlyYXRpb24sXG4gICAgICAgIFNlY3JldEtleSA9IHRocm93T25NaXNzaW5nU2VjcmV0S2V5KCksXG4gICAgICAgIFNlc3Npb25Ub2tlbixcbiAgICAgIH0gPSB0aHJvd09uTWlzc2luZ0NyZWRlbnRpYWxzKCksXG4gICAgfSA9IGF3YWl0IHBhcmFtZXRlcnMuY2xpZW50LnNlbmQoXG4gICAgICBuZXcgR2V0Q3JlZGVudGlhbHNGb3JJZGVudGl0eUNvbW1hbmQoe1xuICAgICAgICBDdXN0b21Sb2xlQXJuOiBwYXJhbWV0ZXJzLmN1c3RvbVJvbGVBcm4sXG4gICAgICAgIElkZW50aXR5SWQ6IHBhcmFtZXRlcnMuaWRlbnRpdHlJZCxcbiAgICAgICAgTG9naW5zOiBwYXJhbWV0ZXJzLmxvZ2lucyA/IGF3YWl0IHJlc29sdmVMb2dpbnMocGFyYW1ldGVycy5sb2dpbnMpIDogdW5kZWZpbmVkLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkZW50aXR5SWQ6IHBhcmFtZXRlcnMuaWRlbnRpdHlJZCxcbiAgICAgIGFjY2Vzc0tleUlkOiBBY2Nlc3NLZXlJZCxcbiAgICAgIHNlY3JldEFjY2Vzc0tleTogU2VjcmV0S2V5LFxuICAgICAgc2Vzc2lvblRva2VuOiBTZXNzaW9uVG9rZW4sXG4gICAgICBleHBpcmF0aW9uOiBFeHBpcmF0aW9uLFxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbUNvZ25pdG9JZGVudGl0eVBhcmFtZXRlcnMgZXh0ZW5kcyBDb2duaXRvUHJvdmlkZXJQYXJhbWV0ZXJzIHtcbiAgLyoqXG4gICAqIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGlkZW50aXR5IGFnYWluc3Qgd2hpY2ggY3JlZGVudGlhbHMgd2lsbCBiZVxuICAgKiBpc3N1ZWQuXG4gICAqL1xuICBpZGVudGl0eUlkOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHRocm93T25NaXNzaW5nQWNjZXNzS2V5SWQoKTogbmV2ZXIge1xuICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcIlJlc3BvbnNlIGZyb20gQW1hem9uIENvZ25pdG8gY29udGFpbmVkIG5vIGFjY2VzcyBrZXkgSURcIik7XG59XG5cbmZ1bmN0aW9uIHRocm93T25NaXNzaW5nQ3JlZGVudGlhbHMoKTogbmV2ZXIge1xuICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcIlJlc3BvbnNlIGZyb20gQW1hem9uIENvZ25pdG8gY29udGFpbmVkIG5vIGNyZWRlbnRpYWxzXCIpO1xufVxuXG5mdW5jdGlvbiB0aHJvd09uTWlzc2luZ1NlY3JldEtleSgpOiBuZXZlciB7XG4gIHRocm93IG5ldyBQcm92aWRlckVycm9yKFwiUmVzcG9uc2UgZnJvbSBBbWF6b24gQ29nbml0byBjb250YWluZWQgbm8gc2VjcmV0IGtleVwiKTtcbn1cbiJdfQ==