import axios from "axios";

export const getInverterData = async (inverterIp: string, date: string) => {
  const response = await axios.get<FroniusArchiveData>(
    `http://${inverterIp}/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=${date}&EndDate=${date}&Channel=EnergyReal_WAC_Sum_Produced`
  );

  return response.data["Body"]["Data"]["inverter/1"]["Data"][
    "EnergyReal_WAC_Sum_Produced"
  ]["Values"];
};

export interface FroniusArchiveData {
  Body: Body;
  Head: Head;
}

export interface Body {
  Data: BodyData;
}

export interface BodyData {
  "inverter/1": Inverter1;
}

export interface Inverter1 {
  Data: Inverter1_Data;
  DeviceType: number;
  End: Date;
  NodeType: number;
  Start: Date;
}

export interface Inverter1_Data {
  EnergyReal_WAC_Sum_Produced: EnergyRealWACSumProduced;
}

export interface EnergyRealWACSumProduced {
  Unit: string;
  Values: { [key: string]: number };
  _comment: string;
}

export interface Head {
  RequestArguments: RequestArguments;
  Status: Status;
  Timestamp: Date;
}

export interface RequestArguments {
  Channel: string[];
  EndDate: Date;
  HumanReadable: string;
  Scope: string;
  SeriesType: string;
  StartDate: Date;
}

export interface Status {
  Code: number;
  ErrorDetail: ErrorDetail;
  Reason: string;
  UserMessage: string;
}

export interface ErrorDetail {
  Nodes: any[];
}
