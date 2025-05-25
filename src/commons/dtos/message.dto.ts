import type { ContentType } from "../enums/content.enum";

export interface MessageDto {
  sender: string;
  contentType: ContentType;
  content: string;
  createdAt: Date;
}
