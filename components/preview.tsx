import { FunctionComponent } from "react";
import TemplateData from "templates/template1";
import { WebsiteData } from "types";

interface PreviewProps {
  websiteData: WebsiteData;
}

const Preview: FunctionComponent<PreviewProps> = ({ websiteData }) => {
  const templateData = TemplateData(websiteData);
  return (
    <div className="fixed left-0 top-0 w-full h-full overflow-auto flex">
      <iframe srcDoc={templateData.previewHtml} style={templateData.presentation.format} className="border-none m-auto"></iframe>
    </div>
  );
};

export default Preview;
