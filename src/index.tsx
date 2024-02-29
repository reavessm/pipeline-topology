import { createRoot } from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';
import './pipeline-styles.css';
import {buildNodeAndEdgeModels} from './pipeline-to-node-and-edge';
import * as _ from '@patternfly/react-icons';

import '@patternfly/react-topology/patternfly-docs/content/examples/./topology-pipelines-example.css';
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
    Node,
    RunStatus,
    Graph,
    GraphModel,
    Layout,
    Model,
    PipelineNodeModel,
    DefaultEdge,
    PipelineDagreLayout,
    ComponentFactory,
    NodeModel,
    GraphElement
} from '@patternfly/react-topology';

// PIPELINE NODE MODEL APPROACH
const TASK_NODES: PipelineNodeModel[] = [
    {
        id: 'int',
        type: 'DEFAULT_TASK_NODE',
        label: 'int',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        }
    },
    {
        id: 'int-test-1',
        type: 'DEFAULT_TASK_NODE',
        label: 'int test 1',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['int'],
        data: {
            status: RunStatus.Succeeded,
            gating: true,
            hash: 'spaghet1234'
        }
    },
    {
        id: 'int-test-2',
        type: 'DEFAULT_TASK_NODE',
        label: 'int test 2',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['int'],
        data: {
            status: RunStatus.Succeeded,
            gating: false,
            hash: 'spaghet2345'
        }
    },
    {
        id: 'stage',
        type: 'DEFAULT_TASK_NODE',
        label: 'stage',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['int', 'int-test-1', 'int-test-2'],
        data: {
            status: RunStatus.Succeeded,
            gating: true,
            hash: 'spaghet3456'
        }
    },
    {
        id: 'finally-0',
        type: 'DEFAULT_FINALLY_NODE',
        label: 'Finally task 0',
        width: 156,
        height: 32,
        runAfterTasks: ['stage'],
        style: {
            paddingLeft: 24
        }
    },
    {
        id: 'finally-1',
        type: 'DEFAULT_FINALLY_NODE',
        label: 'Finally task 1',
        width: 156,
        height: 32,
        runAfterTasks: ['stage'],
        style: {
            paddingLeft: 24
        }
    }
];

interface DemoTaskNodeProps {
    element: Node<NodeModel, any> | Graph<GraphModel, any> | GraphElement;
}

const DemoTaskNode: React.FunctionComponent<DemoTaskNodeProps> = ({ element }) => {
    const data = element.getData();

    return (
        <TaskNode element={element} status={data?.status} toolTip={JSON.stringify(data)}></TaskNode>
    );
};

const pipelineComponentFactory: ComponentFactory = (kind: ModelKind, type: string) => {
    if (kind === ModelKind.graph) {
        return GraphComponent;
    }
    switch (type) {
        case DEFAULT_TASK_NODE_TYPE:
            return DemoTaskNode; // TODO: as far as I can assume all nodes should be this type <-
        case DEFAULT_FINALLY_NODE_TYPE:
            return FinallyNode;
        case 'task-group':
            return DefaultTaskGroup;
        case 'finally-group':
            return DefaultTaskGroup;
        case DEFAULT_SPACER_NODE_TYPE:
            return SpacerNode;
        case 'finally-spacer-edge':
        case DEFAULT_EDGE_TYPE:
            return TaskEdge;
        case ModelKind.edge:
            return DefaultEdge;
        default:
            return undefined;
    }
};

export const PipelineTasks: React.FC = () => {
    const controller = useVisualizationController();
    React.useEffect(() => {
        controller.fromModel(
            {
                graph: {
                    id: 'g1',
                    type: 'graph'
                },
                nodes: TASK_NODES
            },
            false
        );
    }, [controller]);

    return (
        <TopologyView>
            <VisualizationSurface/>
        </TopologyView>
    );
};

PipelineTasks.displayName = 'PipelineTasks';

interface TopologyProps {
    nodeModel: PipelineNodeModel[];
}

export const TopologyPipelinesGettingStartedDemo: React.FunctionComponent<TopologyProps> = ({ nodeModel }) => {
    let { nodes, edges } = buildNodeAndEdgeModels({ pipelineNodes: nodeModel ? nodeModel : TASK_NODES });
    const controller = new Visualization();
    controller.setFitToScreenOnLayout(true);
    controller.registerComponentFactory(pipelineComponentFactory);
    controller.registerLayoutFactory((_type: string, graph: Graph): Layout | undefined => new PipelineDagreLayout(graph));

    const model: Model = {
        nodes,
        edges,
        graph: {
            id: 'g1',
            type: 'graph',
            layout: 'pipelineLayout'
        }
    };

    controller.fromModel(model, false);

    return (
        <VisualizationProvider controller={controller}>
            <VisualizationSurface />
        </VisualizationProvider>
    );
};

// Uncomment this to run standalone
// const container = document.getElementById("root");
// createRoot(container).render(<TopologyPipelinesGettingStartedDemo />);
