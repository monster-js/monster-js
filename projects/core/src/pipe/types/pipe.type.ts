type PipeType = (value: any, params: any[]) => void;

export interface PipeInterface extends PipeType {
    namespace?: string;
}

export type Pipe = PipeInterface;
