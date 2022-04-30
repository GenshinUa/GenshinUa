import Image from "./image";

export default interface Article {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    Title:               string;
    Content:             string;
    Hero:                Image;
    createdAt:           Date;
    updatedAt:           Date;
    publishedAt:         Date;
    vuid:                string;
    versionNumber:       number;
    isVisibleInListView: boolean;
}
