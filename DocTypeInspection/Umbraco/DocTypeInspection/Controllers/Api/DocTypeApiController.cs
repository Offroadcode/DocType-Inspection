using System.Collections.Generic;
using System.Web.Http;
using DocTypeInspection.Controllers.Attributes;
using DocTypeInspection.Models.ViewModels;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Services;
using Umbraco.Web.Editors;
using Template = DocTypeInspection.Models.Template;

namespace DocTypeInspection.Controllers.Api
{
    //[IsBackOffice]
    [CamelCaseController]
    public class DocTypeApiController : UmbracoAuthorizedJsonController
    {
        private static readonly IContentTypeService ContentTypeService = ApplicationContext.Current.Services.ContentTypeService;
        private static readonly IContentService ContentService = ApplicationContext.Current.Services.ContentService;
        private static readonly IUserService UserService = ApplicationContext.Current.Services.UserService;

        [HttpGet]
        public DocTypeViewModel GetDocTypeInformation(int id)
        {
            var docTypeInfo = new DocTypeViewModel();
            var node = ContentService.GetById(id);
            if (node != null)
            {
                var docType = ContentTypeService.GetContentType(node.ContentTypeId);
                if (docType != null)
                {
                    docTypeInfo.Description = docType.Description;
                    docTypeInfo.AllowAtRoot = docType.AllowedAsRoot;
                    docTypeInfo.DefaultTemplate = new Template();
                    if (docType.DefaultTemplate != null)
                    {
                        docTypeInfo.DefaultTemplate.Alias = docType.DefaultTemplate.Alias;
                        docTypeInfo.DefaultTemplate.Id = docType.DefaultTemplate.Id;
                    }

                    var templates = new List<Template>();

                    foreach (var template in docType.AllowedTemplates)
                    {
                        templates.Add(new Template
                        {
                            Alias = template.Alias,
                            Id = template.Id 
                        });
                    }

                    docTypeInfo.Templates = templates;

                    docTypeInfo.CreatedOn = node.CreateDate.ToString("g");
                    docTypeInfo.CreatedBy = node.GetCreatorProfile(UserService).Name;
                    docTypeInfo.LastEditedOn = node.UpdateDate.ToString("g");
                    docTypeInfo.LastEditedBy = node.GetWriterProfile(UserService).Name;
                    docTypeInfo.Status = ContentService.GetById(node.Id).Status;

                }
            }

            return docTypeInfo;
        }
    }
}
