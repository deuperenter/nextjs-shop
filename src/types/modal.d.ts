export type AlertMsg = [msg1: string, msg2?: string, errorCode?: string];
export type ReportType =
  | { pId: string; rId?: string; seller?: never }
  | { pId: string; rId?: never; seller?: string };

export type ModalState = {
  value:
    | {
        close: boolean;
        alertMsg?: never;
        confirm?: never;
        yes?: never;
        report?: never;
      }
    | {
        close?: never;
        alertMsg: AlertMsg;
        confirm?: string;
        yes?: never;
        report?: never;
      }
    | {
        close?: never;
        alertMsg?: never;
        confirm?: never;
        yes: string;
        report?: never;
      }
    | {
        close?: never;
        alertMsg?: never;
        confirm?: never;
        yes?: never;
        report: ReportType;
      };
};
