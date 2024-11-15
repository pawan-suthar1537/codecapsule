export type MessageText = {
  type: "text";
  text: string;
};

export type messageCode = {
  type: "code";
  text: string;
};

export type messageImage = {
  type: "image";
  image: string;
};

export type message = {
  role: "user" | "assistant";
  content: Array<MessageText | messageCode | messageImage>;
};
