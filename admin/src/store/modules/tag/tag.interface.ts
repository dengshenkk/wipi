export interface ITag {
  id: string;
  name: string;
  value: string;
}

export interface ITagState {
  tags?: ITag[];
}
