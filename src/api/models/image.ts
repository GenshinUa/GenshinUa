export default interface Image {
    data: Data;
}

export interface Data {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    name:              string;
    alternativeText:   string;
    caption:           string;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Formats {
    large:     Size;
    small:     Size;
    medium:    Size;
    thumbnail: Size;
}

export interface Size {
    ext:    string;
    url:    string;
    hash:   string;
    mime:   string;
    name:   string;
    path:   null;
    size:   number;
    width:  number;
    height: number;
}