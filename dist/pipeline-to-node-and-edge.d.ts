import { NodeModel, EdgeModel, PipelineNodeModel } from '@patternfly/react-topology';
interface Props {
    pipelineNodes: PipelineNodeModel[];
}
export declare const buildNodeAndEdgeModels: ({ pipelineNodes }: Props) => {
    nodes: NodeModel[];
    edges: EdgeModel[];
};
export {};
