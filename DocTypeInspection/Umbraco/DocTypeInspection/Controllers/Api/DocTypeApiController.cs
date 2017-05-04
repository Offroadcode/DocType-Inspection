using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DocTypeInspection.Controllers.Attributes;
using DocTypeInspection.Models;
using DocTypeInspection.Models.ViewModels;
using Umbraco.Core;
using Umbraco.Core.Services;
using Umbraco.Web.Editors;
using Umbraco.Web.WebApi;

namespace DocTypeInspection.Controllers.Api
{
    //[IsBackOffice]
    [CamelCaseController]
    public class DocTypeApiController : UmbracoAuthorizedJsonController
    {
        private static readonly IContentTypeService ContentTypeService = ApplicationContext.Current.Services.ContentTypeService;

        [HttpGet]
        public DocTypeViewModel GetDocTypeInformation(int id)
        {
            var docTypeInfo = new DocTypeViewModel();
            var node = Umbraco.TypedContent(id);
            if (node != null)
            {
                var docType = ContentTypeService.GetContentType(node.DocumentTypeId);
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
                }
            }

            return docTypeInfo;
        }
    }
}
