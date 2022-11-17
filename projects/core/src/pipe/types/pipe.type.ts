type PipeType = (value: any, params: any[]) => void;

export interface PipeInterface extends PipeType {
    selector?: string;
}

export type Pipe = PipeInterface;
