import * as React from 'react';
import {
    TopologyView,
    Visualization,
    VisualizationProvider,
    VisualizationSurface,
    useVisualizationController,
    DefaultTaskGroup,
    GraphComponent,
    ModelKind,
    TaskNode,
    SpacerNode,
    TaskEdge,
    FinallyNode,
    DEFAULT_FINALLY_NODE_TYPE,
    DEFAULT_TASK_NODE_TYPE,
    DEFAULT_EDGE_TYPE,
    DEFAULT_SPACER_NODE_TYPE,
    DEFAULT_WHEN_OFFSET,
    Node,
    WhenDecorator,
    RunStatus,
    Graph,
    Layout,
    Model,
    NodeModel,
    NodeStatus,
    EdgeModel,
    EdgeStyle,
    PipelineNodeModel,
    getEdgesFromNodes,
    DefaultEdge,
    getSpacerNodes,
    LabelPosition,
    NodeShape,
    PipelineDagreLayout
} from '@patternfly/react-topology';

interface Props {
    pipelineNodes: PipelineNodeModel[];
}

export const buildNodeAndEdgeModels = ({ pipelineNodes }: Props): { nodes: NodeModel[], edges: EdgeModel[] } => {
    const nodes: NodeModel[] = [];
    const edges: EdgeModel[] = [];

    // Iterate through each PipelineNodeModel
    pipelineNodes.forEach((pipelineNode) => {
        // Create a NodeModel based on the PipelineNodeModel
        const node: NodeModel = {
            id: pipelineNode.id,
            type: 'DEFAULT_TASK_NODE',
            label: pipelineNode.label,
            data: pipelineNode.data,
        };

        nodes.push(node);

        // Create edges if there are runAfterTasks
        if (pipelineNode.runAfterTasks && pipelineNode.runAfterTasks.length > 0) {
            pipelineNode.runAfterTasks.forEach((taskId) => {
                // Find the source node
                const targetNode = pipelineNodes.find(node => node.id === taskId);

                // Determine the edgeStyle based on the gating status of the source node
                const edgeStyle = targetNode?.data?.gating ? EdgeStyle.dotted : EdgeStyle.default;

                // Create an EdgeModel for each runAfterTask
                const edge: EdgeModel = {
                    id: `${taskId}-${pipelineNode.id}`,
                    type: 'edge',
                    source: taskId,
                    target: pipelineNode.id,
                    edgeStyle,
                };

                edges.push(edge);
            });
        }
    });

    return { nodes, edges };
};