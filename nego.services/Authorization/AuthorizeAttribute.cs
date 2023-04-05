using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using nego.communs.Model;
using Microsoft.AspNetCore.Http;
using nego.communs.Resource;
using AutoMapper;
using System.Diagnostics;

namespace nego.services.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {

        private readonly IList<int> _roleIds;

        public AuthorizeAttribute(params int[] roleIds)
        {
            _roleIds = roleIds ?? new int[] { };
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            // authorization
            /*var user = (User)context.HttpContext.Items["User"];*/

            var user = await (Task<UserRessource>)context.HttpContext.Items["User"];
            if (user == null || (_roleIds.Any() && !user.Roles.Intersect(_roleIds).Any()))
            {
                // not logged in or role not authorized
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}
