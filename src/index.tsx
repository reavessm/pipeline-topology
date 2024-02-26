import { createRoot } from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';
import './pipeline-styles.css';

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
    PipelineDagreLayout
} from '@patternfly/react-topology';
import {CSSProperties} from "react";

const HEIGHT = 75;
const WIDTH = 225;

// NODE AND EDGE APPROACH
// const EDGE_MODEL = [
//     {
//         id: 'int->int-test-1',
//         type: 'edge',
//         source: 'int',
//         target: 'int-test-1',
//         edgeStyle: EdgeStyle.dotted
//     },
//     {
//         id: 'int->int-test-2',
//         type: 'edge',
//         source: 'int',
//         target: 'int-test-2',
//         edgeStyle: EdgeStyle.default
//     },
//     {
//         id: 'int->stage',
//         type: 'edge',
//         source: 'int',
//         target: 'stage',
//         edgeStyle: EdgeStyle.dashedXl
//     },
//     {
//         id: 'int->canary-a',
//         type: 'edge',
//         source: 'stage',
//         target: 'canary-a',
//         edgeStyle: EdgeStyle.default
//     }
// ];
//
// const TASK_NODES: NodeModel[] = [
//     {
//         id: 'int',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'int label',
//         data: {gating: true, description: 'stuff'},
//         width: WIDTH
//         // width: 180,
//         // height: 32,
//         // style: {
//         //     padding: [45, 15]
//         // }
//     },
//     {
//         id: 'int-test-1',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'int test 1 label',
//         data: {
//             status: RunStatus.Failed
//         },
//         width: WIDTH
//     },
//     {
//         id: 'int-test-2',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'int test 2 label',
//         data: {
//             status: RunStatus.Idle
//         },
//         width: WIDTH
//     },
//     {
//         id: 'stage',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'stage label',
//         // width: 180,
//         // height: 32,
//         // style: {
//         //     padding: [45, 15]
//         // },
//         data: {
//             status: RunStatus.Pending
//         },
//         width: WIDTH
//     },
//     {
//         id: 'canary-a',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'canary-a label',
//         data: {
//             status: RunStatus.FailedToStart
//         },
//         width: WIDTH
//     },
//     {
//         id: 'int-test-3',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'int test 3 label',
//         data: {
//             status: RunStatus.Idle
//         },
//         width: WIDTH
//     },
//     {
//         id: 'int-test-4',
//         type: 'DEFAULT_TASK_NODE',
//         label: 'int test 4 label',
//         data: {
//             status: RunStatus.Idle
//         },
//         width: WIDTH
//     }
//     // {
//     //     id: 'finally-0',
//     //     type: 'DEFAULT_FINALLY_NODE',
//     //     label: 'Finally task 0',
//     //     // width: 156,
//     //     // height: 32,
//     //     // style: {
//     //     //     paddingLeft: 24
//     //     // }
//     // },
//     // {
//     //     id: 'finally-1',
//     //     type: 'DEFAULT_FINALLY_NODE',
//     //     label: 'Finally task 1',
//     //     // width: 156,
//     //     // height: 32,
//     //     // style: {
//     //     //     paddingLeft: 24
//     //     // }
//     // }
// ];

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
            gating: true,
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
        style: {
            paddingLeft: 24
        }
    }
];

interface DemoTaskNodeProps {
    element: Node;
}

const DemoTaskNode: React.FunctionComponent<DemoTaskNodeProps> = ({ element }) => {
    const data = element.getData();
    const style = data?.style || {}; // Retrieve style object, default to empty object if not present

    const whenDecorator = data?.whenStatus ? (
        <WhenDecorator element={element} status={data.whenStatus} leftOffset={DEFAULT_WHEN_OFFSET} />
    ) : null;

    return (
        <TaskNode element={element} status={data?.status} style={style}>
            {whenDecorator}
        </TaskNode>
    );
};

const pipelineComponentFactory = (kind: ModelKind, type: string) => {
    if (kind === ModelKind.graph) {
        return GraphComponent;
    }
    switch (type) {
        case DEFAULT_TASK_NODE_TYPE:
            return DemoTaskNode;
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

export const TopologyPipelinesGettingStartedDemo: React.FC = () => {
    const controller = new Visualization();
    controller.setFitToScreenOnLayout(true);
    controller.registerComponentFactory(pipelineComponentFactory);
    controller.registerLayoutFactory((type: string, graph: Graph): Layout | undefined => new PipelineDagreLayout(graph));
    const spacerNodes = getSpacerNodes(TASK_NODES);
    const nodes = [...TASK_NODES, ...spacerNodes];
    const edges = getEdgesFromNodes(TASK_NODES);

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
            <div style={{ width: '100vh', height: '100vw' }}> {/*make visualization surface area larger*/}
                <VisualizationSurface />
            </div>
        </VisualizationProvider>
    );
};

const container = document.getElementById("root");
createRoot(container).render(<TopologyPipelinesGettingStartedDemo />);
