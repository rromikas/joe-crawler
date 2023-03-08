import { WebsiteData } from "types";
import adData from "./ad-data.json";
import emptyData from "../empty.json";

const getItems = (websiteData: WebsiteData) => {
  let items: typeof adData["items"] = [];
  const [something, ...slideImages] = websiteData.images;
  const swiperItem = adData.items.find((x) => x.name === "swiper");
  const slideItem = adData.items.find((x) => x.name === "slide");
  const slideImageItem = adData.items.find((x) => x.name === "slide-image");
  const slideBackgroundItem = adData.items.find((x) => x.name === "slide-background");
  const somethingItem = adData.items.find((x) => x.name === "something");
  const ctaItem = adData.items.find((x) => x.name === "cta");
  const backgroundItem = adData.items.find((x) => x.name === "background");
  const logoItem = adData.items.find((x) => x.name === "logo");

  if (!slideItem || !slideImageItem || !slideBackgroundItem || !somethingItem || !backgroundItem || !swiperItem || !ctaItem) {
    throw new Error("Template 1 is incorrect");
  }

  items.push(swiperItem);

  slideImages.forEach((x) => {
    const slideId = Math.random().toString();
    items.push({ ...slideImageItem, parentId: slideId, id: Math.random().toString(), imageUrl: x } as typeof items[number]);
    items.push({ ...slideItem, id: slideId });
    items.push({ ...slideBackgroundItem, parentId: slideId, id: Math.random().toString() });
  });

  items.push({ ...somethingItem, imageUrl: something } as typeof items[number]);
  items.push({
    ...ctaItem,
    onClick: [{ id: "openLink", linkUrl: websiteData.url }],
    backgroundColor: websiteData.colors[1] || ctaItem.backgroundColor,
  } as typeof items[number]);
  items.push({
    ...logoItem,
    imageUrl: websiteData.logos[0],
  } as typeof items[number]);
  items.push({
    ...backgroundItem,
    backgroundColor: websiteData.colors[0] ?? backgroundItem?.backgroundColor,
  } as typeof items[number]);

  return items;
};

const template = (items: typeof adData.items) => {
  return emptyData.previewHtml.replace(
    "{SOFIA_AD_DATA}",
    JSON.stringify({
      ...adData,
      items,
    })
  );
};

const TemplateData = (websiteData: WebsiteData) => {
  const items = getItems(websiteData);
  return { ...adData, items, previewHtml: template(items) };
};

export default TemplateData;
