export interface InputData {
  inputType: string;
  content: string;
  processed: boolean;
}

export interface RoutingData {
  recommendedTool: string;
  confidence: number;
  alternatives: Array<{
    name: string;
    score: number;
  }>;
}

export interface ResultData {
  rawData: Record<string, any>;
  visualization: {
    type: string;
    data: any;
  };
}

export interface ToolConfig {
  id: string;
  name: string;
  type: string;
  config: {
    endpoint?: string;
    authType?: string;
    parameters?: string[];
  };
  capabilities: {
    dimensions: string[];
    scores: number[];
  };
}