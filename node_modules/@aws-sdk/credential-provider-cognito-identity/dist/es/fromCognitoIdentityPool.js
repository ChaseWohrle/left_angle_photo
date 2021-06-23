import { __awaiter, __generator } from "tslib";
import { GetIdCommand } from "@aws-sdk/client-cognito-identity";
import { ProviderError } from "@aws-sdk/property-provider";
import { fromCognitoIdentity } from "./fromCognitoIdentity";
import { localStorage } from "./localStorage";
import { resolveLogins } from "./resolveLogins";
/**
 * Retrieves or generates a unique identifier using Amazon Cognito's `GetId`
 * operation, then generates temporary AWS credentials using Amazon Cognito's
 * `GetCredentialsForIdentity` operation.
 *
 * Results from `GetId` are cached internally, but results from
 * `GetCredentialsForIdentity` are not.
 */
export function fromCognitoIdentityPool(_a) {
    var _this = this;
    var accountId = _a.accountId, _b = _a.cache, cache = _b === void 0 ? localStorage() : _b, client = _a.client, customRoleArn = _a.customRoleArn, identityPoolId = _a.identityPoolId, logins = _a.logins, _c = _a.userIdentifier, userIdentifier = _c === void 0 ? !logins || Object.keys(logins).length === 0 ? "ANONYMOUS" : undefined : _c;
    var cacheKey = userIdentifier ? "aws:cognito-identity-credentials:" + identityPoolId + ":" + userIdentifier : undefined;
    var provider = function () { return __awaiter(_this, void 0, void 0, function () {
        var identityId, _a, _b, IdentityId, _c, _d, _e, _f;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = cacheKey;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, cache.getItem(cacheKey)];
                case 1:
                    _a = (_h.sent());
                    _h.label = 2;
                case 2:
                    identityId = _a;
                    if (!!identityId) return [3 /*break*/, 7];
                    _d = (_c = client).send;
                    _e = GetIdCommand.bind;
                    _g = {
                        AccountId: accountId,
                        IdentityPoolId: identityPoolId
                    };
                    if (!logins) return [3 /*break*/, 4];
                    return [4 /*yield*/, resolveLogins(logins)];
                case 3:
                    _f = _h.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _f = undefined;
                    _h.label = 5;
                case 5: return [4 /*yield*/, _d.apply(_c, [new (_e.apply(GetIdCommand, [void 0, (_g.Logins = _f,
                                _g)]))()])];
                case 6:
                    _b = (_h.sent()).IdentityId, IdentityId = _b === void 0 ? throwOnMissingId() : _b;
                    identityId = IdentityId;
                    if (cacheKey) {
                        Promise.resolve(cache.setItem(cacheKey, identityId)).catch(function () { });
                    }
                    _h.label = 7;
                case 7:
                    provider = fromCognitoIdentity({
                        client: client,
                        customRoleArn: customRoleArn,
                        logins: logins,
                        identityId: identityId,
                    });
                    return [2 /*return*/, provider()];
            }
        });
    }); };
    return function () {
        return provider().catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (cacheKey) {
                    Promise.resolve(cache.removeItem(cacheKey)).catch(function () { });
                }
                throw err;
            });
        }); });
    };
}
function throwOnMissingId() {
    throw new ProviderError("Response from Amazon Cognito contained no identity ID");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUNvZ25pdG9JZGVudGl0eVBvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnJvbUNvZ25pdG9JZGVudGl0eVBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHM0QsT0FBTyxFQUFxQyxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9GLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHaEQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQVFKO0lBUnBDLGlCQTZDQztRQTVDQyxTQUFTLGVBQUEsRUFDVCxhQUFzQixFQUF0QixLQUFLLG1CQUFHLFlBQVksRUFBRSxLQUFBLEVBQ3RCLE1BQU0sWUFBQSxFQUNOLGFBQWEsbUJBQUEsRUFDYixjQUFjLG9CQUFBLEVBQ2QsTUFBTSxZQUFBLEVBQ04sc0JBQXNGLEVBQXRGLGNBQWMsbUJBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBQTtJQUV0RixJQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLHNDQUFvQyxjQUFjLFNBQUksY0FBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRXJILElBQUksUUFBUSxHQUFzQzs7Ozs7O29CQUMvQixLQUFBLFFBQVEsQ0FBQTs2QkFBUix3QkFBUTtvQkFBSyxxQkFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFBOztvQkFBOUIsS0FBQSxDQUFDLFNBQTZCLENBQUMsQ0FBQTs7O29CQUF4RCxVQUFVLEtBQThDO3lCQUN4RCxDQUFDLFVBQVUsRUFBWCx3QkFBVztvQkFDcUMsS0FBQSxDQUFBLEtBQUEsTUFBTSxDQUFBLENBQUMsSUFBSSxDQUFBO3lCQUN2RCxZQUFZOzt3QkFDZCxTQUFTLEVBQUUsU0FBUzt3QkFDcEIsY0FBYyxFQUFFLGNBQWM7O3lCQUN0QixNQUFNLEVBQU4sd0JBQU07b0JBQUcscUJBQU0sYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOztvQkFBM0IsS0FBQSxTQUEyQixDQUFBOzs7b0JBQUcsS0FBQSxTQUFTLENBQUE7O3dCQUpoQixxQkFBTSxjQUNoRCxjQUFJLFlBQVksWUFHZCxTQUFNLEtBQWtEO3dDQUN4RCxFQUNILEVBQUE7O29CQU5PLEtBQW9DLENBQUEsU0FNM0MsQ0FBQSxXQU5zQyxFQUEvQixVQUFVLG1CQUFHLGdCQUFnQixFQUFFLEtBQUE7b0JBT3ZDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQ3hCLElBQUksUUFBUSxFQUFFO3dCQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDdEU7OztvQkFHSCxRQUFRLEdBQUcsbUJBQW1CLENBQUM7d0JBQzdCLE1BQU0sUUFBQTt3QkFDTixhQUFhLGVBQUE7d0JBQ2IsTUFBTSxRQUFBO3dCQUNOLFVBQVUsWUFBQTtxQkFDWCxDQUFDLENBQUM7b0JBRUgsc0JBQU8sUUFBUSxFQUFFLEVBQUM7OztTQUNuQixDQUFDO0lBRUYsT0FBTztRQUNMLE9BQUEsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQU8sR0FBRzs7Z0JBQ3pCLElBQUksUUFBUSxFQUFFO29CQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDtnQkFFRCxNQUFNLEdBQUcsQ0FBQzs7YUFDWCxDQUFDO0lBTkYsQ0FNRSxDQUFDO0FBQ1AsQ0FBQztBQXNDRCxTQUFTLGdCQUFnQjtJQUN2QixNQUFNLElBQUksYUFBYSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7QUFDbkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdldElkQ29tbWFuZCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtY29nbml0by1pZGVudGl0eVwiO1xuaW1wb3J0IHsgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuXG5pbXBvcnQgeyBDb2duaXRvUHJvdmlkZXJQYXJhbWV0ZXJzIH0gZnJvbSBcIi4vQ29nbml0b1Byb3ZpZGVyUGFyYW1ldGVyc1wiO1xuaW1wb3J0IHsgQ29nbml0b0lkZW50aXR5Q3JlZGVudGlhbFByb3ZpZGVyLCBmcm9tQ29nbml0b0lkZW50aXR5IH0gZnJvbSBcIi4vZnJvbUNvZ25pdG9JZGVudGl0eVwiO1xuaW1wb3J0IHsgbG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQgeyByZXNvbHZlTG9naW5zIH0gZnJvbSBcIi4vcmVzb2x2ZUxvZ2luc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgb3IgZ2VuZXJhdGVzIGEgdW5pcXVlIGlkZW50aWZpZXIgdXNpbmcgQW1hem9uIENvZ25pdG8ncyBgR2V0SWRgXG4gKiBvcGVyYXRpb24sIHRoZW4gZ2VuZXJhdGVzIHRlbXBvcmFyeSBBV1MgY3JlZGVudGlhbHMgdXNpbmcgQW1hem9uIENvZ25pdG8nc1xuICogYEdldENyZWRlbnRpYWxzRm9ySWRlbnRpdHlgIG9wZXJhdGlvbi5cbiAqXG4gKiBSZXN1bHRzIGZyb20gYEdldElkYCBhcmUgY2FjaGVkIGludGVybmFsbHksIGJ1dCByZXN1bHRzIGZyb21cbiAqIGBHZXRDcmVkZW50aWFsc0ZvcklkZW50aXR5YCBhcmUgbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUNvZ25pdG9JZGVudGl0eVBvb2woe1xuICBhY2NvdW50SWQsXG4gIGNhY2hlID0gbG9jYWxTdG9yYWdlKCksXG4gIGNsaWVudCxcbiAgY3VzdG9tUm9sZUFybixcbiAgaWRlbnRpdHlQb29sSWQsXG4gIGxvZ2lucyxcbiAgdXNlcklkZW50aWZpZXIgPSAhbG9naW5zIHx8IE9iamVjdC5rZXlzKGxvZ2lucykubGVuZ3RoID09PSAwID8gXCJBTk9OWU1PVVNcIiA6IHVuZGVmaW5lZCxcbn06IEZyb21Db2duaXRvSWRlbnRpdHlQb29sUGFyYW1ldGVycyk6IENvZ25pdG9JZGVudGl0eUNyZWRlbnRpYWxQcm92aWRlciB7XG4gIGNvbnN0IGNhY2hlS2V5ID0gdXNlcklkZW50aWZpZXIgPyBgYXdzOmNvZ25pdG8taWRlbnRpdHktY3JlZGVudGlhbHM6JHtpZGVudGl0eVBvb2xJZH06JHt1c2VySWRlbnRpZmllcn1gIDogdW5kZWZpbmVkO1xuXG4gIGxldCBwcm92aWRlcjogQ29nbml0b0lkZW50aXR5Q3JlZGVudGlhbFByb3ZpZGVyID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCBpZGVudGl0eUlkID0gY2FjaGVLZXkgJiYgKGF3YWl0IGNhY2hlLmdldEl0ZW0oY2FjaGVLZXkpKTtcbiAgICBpZiAoIWlkZW50aXR5SWQpIHtcbiAgICAgIGNvbnN0IHsgSWRlbnRpdHlJZCA9IHRocm93T25NaXNzaW5nSWQoKSB9ID0gYXdhaXQgY2xpZW50LnNlbmQoXG4gICAgICAgIG5ldyBHZXRJZENvbW1hbmQoe1xuICAgICAgICAgIEFjY291bnRJZDogYWNjb3VudElkLFxuICAgICAgICAgIElkZW50aXR5UG9vbElkOiBpZGVudGl0eVBvb2xJZCxcbiAgICAgICAgICBMb2dpbnM6IGxvZ2lucyA/IGF3YWl0IHJlc29sdmVMb2dpbnMobG9naW5zKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBpZGVudGl0eUlkID0gSWRlbnRpdHlJZDtcbiAgICAgIGlmIChjYWNoZUtleSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoY2FjaGUuc2V0SXRlbShjYWNoZUtleSwgaWRlbnRpdHlJZCkpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm92aWRlciA9IGZyb21Db2duaXRvSWRlbnRpdHkoe1xuICAgICAgY2xpZW50LFxuICAgICAgY3VzdG9tUm9sZUFybixcbiAgICAgIGxvZ2lucyxcbiAgICAgIGlkZW50aXR5SWQsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvdmlkZXIoKTtcbiAgfTtcblxuICByZXR1cm4gKCkgPT5cbiAgICBwcm92aWRlcigpLmNhdGNoKGFzeW5jIChlcnIpID0+IHtcbiAgICAgIGlmIChjYWNoZUtleSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoY2FjaGUucmVtb3ZlSXRlbShjYWNoZUtleSkpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZyb21Db2duaXRvSWRlbnRpdHlQb29sUGFyYW1ldGVycyBleHRlbmRzIENvZ25pdG9Qcm92aWRlclBhcmFtZXRlcnMge1xuICAvKipcbiAgICogQSBzdGFuZGFyZCBBV1MgYWNjb3VudCBJRCAoOSsgZGlnaXRzKS5cbiAgICovXG4gIGFjY291bnRJZD86IHN0cmluZztcblxuICAvKipcbiAgICogQSBjYWNoZSBpbiB3aGljaCB0byBzdG9yZSByZXNvbHZlZCBDb2duaXRvIElkZW50aXR5SWRzLiBJZiBub3Qgc3VwcGxpZWQsXG4gICAqIHRoZSBjcmVkZW50aWFsIHByb3ZpZGVyIHdpbGwgYXR0ZW1wdCB0byBzdG9yZSBJZGVudGl0eUlkcyBpbiBvbmUgb2YgdGhlXG4gICAqIGZvbGxvd2luZyAoaW4gb3JkZXIgb2YgcHJlZmVyZW5jZSk6XG4gICAqICAgMS4gSW5kZXhlZERCXG4gICAqICAgMi4gTG9jYWxTdG9yYWdlXG4gICAqICAgMy4gQW4gaW4tbWVtb3J5IGNhY2hlIG9iamVjdCB0aGF0IHdpbGwgbm90IHBlcnNpc3QgYmV0d2VlbiBwYWdlcy5cbiAgICpcbiAgICogSW5kZXhlZERCIGlzIHByZWZlcnJlZCB0byBtYXhpbWl6ZSBkYXRhIHNoYXJpbmcgYmV0d2VlbiB0b3AtbGV2ZWxcbiAgICogYnJvd3NpbmcgY29udGV4dHMgYW5kIHdlYiB3b3JrZXJzLlxuICAgKlxuICAgKiBUaGUgcHJvdmlkZXIgd2lsbCBub3QgY2FjaGUgSWRlbnRpdHlJZHMgb2YgYXV0aGVudGljYXRlZCB1c2VycyB1bmxlc3MgYVxuICAgKiBzZXBhcmF0ZSBgdXNlcklkZW50aXRpZmVyYCBwYXJhbWV0ZXIgaXMgc3VwcGxpZWQuXG4gICAqL1xuICBjYWNoZT86IFN0b3JhZ2U7XG5cbiAgLyoqXG4gICAqIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGlkZW50aXR5IHBvb2wgZnJvbSB3aGljaCBhbiBpZGVudGl0eSBzaG91bGRcbiAgICogYmUgcmV0cmlldmVkIG9yIGdlbmVyYXRlZC5cbiAgICovXG4gIGlkZW50aXR5UG9vbElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyLiBUaGlzIGlzIGRpc3RpbmN0IGZyb20gYSBDb2duaXRvXG4gICAqIElkZW50aXR5SWQgYW5kIHNob3VsZCBpbnN0ZWFkIGJlIGFuIGlkZW50aWZpZXIgbWVhbmluZ2Z1bCB0byB5b3VyXG4gICAqIGFwcGxpY2F0aW9uLiBVc2VkIHRvIGNhY2hlIENvZ25pdG8gSWRlbnRpdHlJZHMgb24gYSBwZXItdXNlciBiYXNpcy5cbiAgICovXG4gIHVzZXJJZGVudGlmaWVyPzogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiB0aHJvd09uTWlzc2luZ0lkKCk6IG5ldmVyIHtcbiAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoXCJSZXNwb25zZSBmcm9tIEFtYXpvbiBDb2duaXRvIGNvbnRhaW5lZCBubyBpZGVudGl0eSBJRFwiKTtcbn1cbiJdfQ==