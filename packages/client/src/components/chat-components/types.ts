export interface IMessage {
  username: string;
  datetime: Date;
  content: string;
  state: {
    hasBeenDeleted: boolean;
    isBeingEdited: boolean;
    hasBeenEdited: boolean;
  }
}

export type ChatBodyRefType = HTMLDivElement | null;

export type GetMessagePropReqsReturnType = {
  shouldOmitHeader: boolean;
  prevMessageIsOneMinuteApart: boolean;
  prevMessageIsFromAnotherUser: boolean;
};

export type GetMessagePropReqsParams = IFirstMessageParams | IConsecutiveMessageParams;

interface IFirstMessageParams {
  firstMessage: IMessage;
  secondMessage: undefined;
  isFirstMessage: true;
}

interface IConsecutiveMessageParams {
  firstMessage: IMessage;
  secondMessage: IMessage;
  isFirstMessage: boolean;
}
