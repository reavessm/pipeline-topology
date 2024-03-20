import { createRoot } from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';
import './pipeline-styles.css';
import {buildNodeAndEdgeModels} from './pipeline-to-node-and-edge';
import {buildPipelineNodelModel} from './json-to-pipeline';
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
    Edge,
    SpacerNode,
    TaskEdge,
    FinallyNode,
    DEFAULT_FINALLY_NODE_TYPE,
    DEFAULT_TASK_NODE_TYPE,
    DEFAULT_EDGE_TYPE,
    DEFAULT_SPACER_NODE_TYPE,
    EdgeTerminalType,
    Node,
    RunStatus,
    Graph,
    GraphModel,
    Layout,
    Model,
    ScaleExtent,
    PipelineNodeModel,
    DefaultEdge,
    PipelineDagreLayout,
    ComponentFactory,
    NodeModel,
    GraphElement
} from '@patternfly/react-topology';

const FROM_JSON = `{
    "saas-sss-sector-demo-a/sss-sector-demo/sss-sector-demo-integration-a/hivei01ue1/cluster-scope":
        {"commit_sha": "0f970ac116108f9463739b38b2b471ddc7e49e76", "deployment_state": "success"},
    "saas-sss-sector-demo-a/sss-sector-demo/sss-sector-demo-integration-b/hivei01ue1/cluster-scope":
        {"commit_sha": "0f970ac116108f9463739b38b2b471ddc7e49e76", "deployment_state": "success"},
    "saas-sss-sector-demo-a/sss-sector-demo/sss-sector-demo-integration-c/hivei01ue1/cluster-scope":
        {"commit_sha": "0f970ac116108f9463739b38b2b471ddc7e49e76", "deployment_state": "success"},
    "saas-sss-sector-b-demo-tests/sss-sector-b-demo-tests/sss-sector-demo-sector-b-test/app-sre-stage-01/selector-syncset-demo-2":
        {"commit_sha": "0f970ac116108f9463739b38b2b471ddc7e49e76", "deployment_state": "success"},
    "saas-sss-sector-b-demo-tests/sss-sector-b-demo-tests/sss-sector-demo-sector-b-test/app-sre-stage-01/selector-syncset-demo":
        {"commit_sha": "0f970ac116108f9463739b38b2b471ddc7e49e76", "deployment_state": "success"},
    "saas-sss-sector-c-demo-tests/sss-sector-demo-c-tests/sss-sector-demo-sector-c-test/app-sre-stage-01/selector-syncset-demo":
        {"commit_sha": "0f970ac116108f9463739b38b2b471ddc7e49e76", "deployment_state": "success"},
    "assisted-installer/assisted-service/default/app-sre-stage-01/assisted-installer-integration":
        {"commit_sha": "eaab3736514e20a320733252f787a6f9b581179d", "deployment_state": "success"},
    "assisted-installer/assisted-service/default/app-sre-stage-01/assisted-installer-stage":
        {"commit_sha": "c9c2dbf01ea3e76bd08965f44055238f2eb26e9c", "deployment_state": "success"},
    "assisted-installer/assisted-service/default/app-sre-prod-04/assisted-installer-production":
        {"commit_sha": "c9c2dbf01ea3e76bd08965f44055238f2eb26e9c", "deployment_state": "success"},
    "saas-devfile-registry/devfile-registry/default/app-sre-stage-01/devfile-registry-stage":
        {"commit_sha": "3e70ac401d416a97b45486c019a9f90042af7df5", "deployment_state": "success"},
    "saas-gabi/gabi-no-cluster-resources/default/app-sre-stage-01/gabi-stage":
        {"commit_sha": "29fea5a84f2f0920f80fb2810cfbd21719140f90", "deployment_state": "success"},
    "saas-gabi-post-deploy-tests/gabi-post-deploy-tests/default/app-sre-stage-01/gabi-stage":
        {"commit_sha": "29fea5a84f2f0920f80fb2810cfbd21719140f90", "deployment_state": "success"},
    "saas-github-mirror/github-mirror/default/appsres07ue1/github-mirror-stage":
        {"commit_sha": "79f91332e6e90b4dc7a1f9649721246856882f56", "deployment_state": "success"},
    "saas-github-mirror-test/github-mirror/default/appsres07ue1/github-mirror-stage":
        {"commit_sha": "79f91332e6e90b4dc7a1f9649721246856882f56", "deployment_state": "success"},
    "saas-glitchtip/glitchtip-app-sre/default/app-sre-stage-01/glitchtip-stage":
        {"commit_sha": "779b0ea1b74ec4aedacd9ea1473b1eede2458858", "deployment_state": "success"},
    "saas-glitchtip/glitchtip-jira-bridge/default/appsres05ue1/glitchtip-jira-bridge-stage":
        {"commit_sha": "0916d819fd6eb3697e335020ececa329124fc3cc", "deployment_state": "success"},
    "saas-glitchtip-test/glitchtip/default/app-sre-stage-01/glitchtip-stage":
        {"commit_sha": "779b0ea1b74ec4aedacd9ea1473b1eede2458858", "deployment_state": "success"},
    "advisor/tasks-frontend/default/crcs02ue1/frontends":
        {"commit_sha": "609601a4d595a9e338fb4c360638f826c30a3442", "deployment_state": "success"},
    "advisor/advisor-backend/default/crcs02ue1/advisor-stage":
        {"commit_sha": "d6064b5bbc0f5293d8c0496020c2b25cab2048ea", "deployment_state": "success"},
    "advisor-test/advisor/default/crcs02ue1/advisor-stage":
        {"commit_sha": "d6064b5bbc0f5293d8c0496020c2b25cab2048ea", "deployment_state": "success"},
    "automation-hub-clowder/automation-hub/default/crcs02ue1/automation-hub-stage":
        {"commit_sha": "67eab5426ad780f65a4e414484d93c1931e869cb", "deployment_state": "success"},
    "ccx-data-pipeline-clowder/insights-aggregator-exporter/default/crcs02ue1/ccx-data-pipeline-stage":
        {"commit_sha": "c26b30f5bf51cb0cd7231d84505bbd2555fdda86", "deployment_state": "success"},
    "ccx-data-pipeline-clowder/insights-aggregator-exporter/default/crcp01ue1/ccx-data-pipeline-prod":
        {"commit_sha": "e0398a583d16c292a79c90a6ccf5dbd361720087", "deployment_state": "success"},
    "ccx-data-pipeline-clowder/insights-notification-db-exporter/default/crcs02ue1/ccx-data-pipeline-stage":
        {"commit_sha": "c26b30f5bf51cb0cd7231d84505bbd2555fdda86", "deployment_state": "missing"},
    "ccx-data-pipeline-clowder/insights-notification-db-exporter/default/crcp01ue1/ccx-data-pipeline-prod":
        {"commit_sha": "e0398a583d16c292a79c90a6ccf5dbd361720087", "deployment_state": "missing"},
    "cloudigrade-clowder/cloudigrade/default/crcs02ue1/cloudigrade-stage":
        {"commit_sha": "5efa32871cb50b4b93a600a3e78bc0abd7690f30", "deployment_state": "success"},
    "cloudigrade-clowder/postigrade/default/crcs02ue1/cloudigrade-stage":
        {"commit_sha": "2043a8388c0808b2111419d0b19e6ac273d5db84", "deployment_state": "success"},
    "cloudigrade-test/cloudigrade/default/crcs02ue1/cloudigrade-stage":
        {"commit_sha": "5efa32871cb50b4b93a600a3e78bc0abd7690f30", "deployment_state": "success"},
    "content-sources/content-sources-backend/default/crcs02ue1/content-sources-stage":
        {"commit_sha": "2f10855f25eda7a214e3393e3d871724fa9c3117", "deployment_state": "success"},
    "content-sources/content-sources-backend/default/crcp01ue1/content-sources-prod":
        {"commit_sha": "6c94ea50a2709086166cfd2cdf91e29b4d40ebfa", "deployment_state": "success"},
    "edge/edge-api/default/crcs02ue1/edge-stage":
        {"commit_sha": "9008e1b5c65c8479fc0caa53118503975dd9b05f", "deployment_state": "success"},
    "edge-test/edge/default/crcs02ue1/edge-stage":
        {"commit_sha": "9008e1b5c65c8479fc0caa53118503975dd9b05f", "deployment_state": "success"},
    "image-builder/image-builder/default/crcs02ue1/image-builder-stage":
        {"commit_sha": "72cf9f579107f2885c157f57354ed52a43f7e9b4", "deployment_state": "success"},
    "image-builder/image-builder/default/crcp01ue1/image-builder-prod":
        {"commit_sha": "154e5e4c4da963a4583bc273976447561076d857", "deployment_state": "success"},
    "image-builder/image-builder-frontend/default/crcs02ue1/frontends":
        {"commit_sha": "6e1df015e1c83a94c984816155199461d74bc5b5", "deployment_state": "success"},
    "image-builder/image-builder-frontend/default/crcp01ue1/frontends":
        {"commit_sha": "45194fa225ea2afae4632d21d9d4021b6a4e57f9", "deployment_state": "success"},
    "malware-detection/malware-detection/default/crcs02ue1/malware-detection-stage":
        {"commit_sha": "f67389437914d87b52d8d7aba2f2d5f788ac67e5", "deployment_state": "success"},
    "notifications-clowder/notifications-backend/default/crcs02ue1/notifications-stage":
        {"commit_sha": "04090478ca07661634f6b8777fa4031d50c06fab", "deployment_state": "success"},
    "notifications-clowder/notifications-connector-servicenow/default/crcs02ue1/notifications-stage":
        {"commit_sha": "04090478ca07661634f6b8777fa4031d50c06fab", "deployment_state": "success"},
    "notifications-clowder/notifications-connector-splunk/default/crcs02ue1/notifications-stage":
        {"commit_sha": "04090478ca07661634f6b8777fa4031d50c06fab", "deployment_state": "success"},
    "notifications-clowder/notifications-connector-webhook/default/crcs02ue1/notifications-stage":
        {"commit_sha": "04090478ca07661634f6b8777fa4031d50c06fab", "deployment_state": "success"},
    "notifications-clowder/notifications-engine/default/crcs02ue1/notifications-stage":
        {"commit_sha": "04090478ca07661634f6b8777fa4031d50c06fab", "deployment_state": "success"},
    "notifications-clowder/notifications-floorist/default/crcs02ue1/notifications-stage":
        {"commit_sha": "04090478ca07661634f6b8777fa4031d50c06fab", "deployment_state": "success"},
    "pdf-generator-clowder/pdf-generator/default/crcs02ue1/pdf-generator-stage":
        {"commit_sha": "6ea17a237a6fec51de7611dc6b82f1260e0f984a", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-integration/osd-fleet-manager-integration-canary/app-sre-stage-01/osd-fleet-manager-integration":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-integration/osd-fleet-manager-integration-regional-ap-southeast-1/app-sre-stage-01/osd-fleet-manager-integration":
        {"commit_sha": "72a931573ddda5d698ba14ccf50475fae867608f", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-integration/osd-fleet-manager-integration-main/app-sre-stage-01/osd-fleet-manager-integration":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-stage/osd-fleet-manager-stage-canary/app-sre-stage-01/osd-fleet-manager-stage":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-stage/osd-fleet-manager-stage-main/app-sre-stage-01/osd-fleet-manager-stage":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-west-2/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-4/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-us-east-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-west-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ca-central-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-northeast-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-3/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-2/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-south-2/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-central-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-south-1/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-canary/app-sre-prod-04/osd-fleet-manager-production":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "success"},
    "osdfm-qe-fvt-gating-tests/osd-fleet-manager/integration-main/app-sre-stage-01/osd-fleet-manager-integration":
        {"commit_sha": "60279bb888252ecb3f80d16f476347379868dea1", "deployment_state": "missing"}
}`;

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

interface DataEdgeProps {
    element: Edge;
}

const DataEdge: React.FC<DataEdgeProps> = ({ element, ...rest }) => (
    <DefaultEdge
        element={element}
        endTerminalType={EdgeTerminalType.none}
        {...rest}
    />
);

interface DemoTaskNodeProps {
    element: Node<NodeModel, any> | Graph<GraphModel, any> | GraphElement;
}

const DemoTaskNode: React.FunctionComponent<DemoTaskNodeProps> = ({ element }) => {
    const data = element.getData();

    return (
        <TaskNode element={element} status={data?.status} toolTip={JSON.stringify(data)} truncateLength={120} badge={data['hash'].substring(0,6)}></TaskNode>
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
        case 'data-edge':
            return DataEdge;
        case ModelKind.edge:
            return DataEdge;
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
    name: string;
    nodeJSON: string;
    scale: number;
    scaleExtent: ScaleExtent;
}

export const TopologyPipelinesGettingStartedDemo: React.FunctionComponent<TopologyProps> = ({ name, nodeJSON, scale, scaleExtent }) => {
    let { nodes, edges } = buildNodeAndEdgeModels({pipelineNodes: buildPipelineNodelModel(name, nodeJSON)});
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
            layout: 'pipelineLayout',
            scale: scale,
            scaleExtent: scaleExtent
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
