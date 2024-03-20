"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologyPipelinesGettingStartedDemo = exports.PipelineTasks = void 0;
require("@patternfly/react-core/dist/styles/base.css");
require("./fonts.css");
require("./pipeline-styles.css");
var pipeline_to_node_and_edge_1 = require("./pipeline-to-node-and-edge");
var json_to_pipeline_1 = require("./json-to-pipeline");
require("@patternfly/react-topology/patternfly-docs/content/examples/./topology-pipelines-example.css");
var React = require("react");
var react_topology_1 = require("@patternfly/react-topology");
var FROM_JSON = "{\n    \"saas-sss-sector-demo-a/sss-sector-demo/sss-sector-demo-integration-a/hivei01ue1/cluster-scope\":\n        {\"commit_sha\": \"0f970ac116108f9463739b38b2b471ddc7e49e76\", \"deployment_state\": \"success\"},\n    \"saas-sss-sector-demo-a/sss-sector-demo/sss-sector-demo-integration-b/hivei01ue1/cluster-scope\":\n        {\"commit_sha\": \"0f970ac116108f9463739b38b2b471ddc7e49e76\", \"deployment_state\": \"success\"},\n    \"saas-sss-sector-demo-a/sss-sector-demo/sss-sector-demo-integration-c/hivei01ue1/cluster-scope\":\n        {\"commit_sha\": \"0f970ac116108f9463739b38b2b471ddc7e49e76\", \"deployment_state\": \"success\"},\n    \"saas-sss-sector-b-demo-tests/sss-sector-b-demo-tests/sss-sector-demo-sector-b-test/app-sre-stage-01/selector-syncset-demo-2\":\n        {\"commit_sha\": \"0f970ac116108f9463739b38b2b471ddc7e49e76\", \"deployment_state\": \"success\"},\n    \"saas-sss-sector-b-demo-tests/sss-sector-b-demo-tests/sss-sector-demo-sector-b-test/app-sre-stage-01/selector-syncset-demo\":\n        {\"commit_sha\": \"0f970ac116108f9463739b38b2b471ddc7e49e76\", \"deployment_state\": \"success\"},\n    \"saas-sss-sector-c-demo-tests/sss-sector-demo-c-tests/sss-sector-demo-sector-c-test/app-sre-stage-01/selector-syncset-demo\":\n        {\"commit_sha\": \"0f970ac116108f9463739b38b2b471ddc7e49e76\", \"deployment_state\": \"success\"},\n    \"assisted-installer/assisted-service/default/app-sre-stage-01/assisted-installer-integration\":\n        {\"commit_sha\": \"eaab3736514e20a320733252f787a6f9b581179d\", \"deployment_state\": \"success\"},\n    \"assisted-installer/assisted-service/default/app-sre-stage-01/assisted-installer-stage\":\n        {\"commit_sha\": \"c9c2dbf01ea3e76bd08965f44055238f2eb26e9c\", \"deployment_state\": \"success\"},\n    \"assisted-installer/assisted-service/default/app-sre-prod-04/assisted-installer-production\":\n        {\"commit_sha\": \"c9c2dbf01ea3e76bd08965f44055238f2eb26e9c\", \"deployment_state\": \"success\"},\n    \"saas-devfile-registry/devfile-registry/default/app-sre-stage-01/devfile-registry-stage\":\n        {\"commit_sha\": \"3e70ac401d416a97b45486c019a9f90042af7df5\", \"deployment_state\": \"success\"},\n    \"saas-gabi/gabi-no-cluster-resources/default/app-sre-stage-01/gabi-stage\":\n        {\"commit_sha\": \"29fea5a84f2f0920f80fb2810cfbd21719140f90\", \"deployment_state\": \"success\"},\n    \"saas-gabi-post-deploy-tests/gabi-post-deploy-tests/default/app-sre-stage-01/gabi-stage\":\n        {\"commit_sha\": \"29fea5a84f2f0920f80fb2810cfbd21719140f90\", \"deployment_state\": \"success\"},\n    \"saas-github-mirror/github-mirror/default/appsres07ue1/github-mirror-stage\":\n        {\"commit_sha\": \"79f91332e6e90b4dc7a1f9649721246856882f56\", \"deployment_state\": \"success\"},\n    \"saas-github-mirror-test/github-mirror/default/appsres07ue1/github-mirror-stage\":\n        {\"commit_sha\": \"79f91332e6e90b4dc7a1f9649721246856882f56\", \"deployment_state\": \"success\"},\n    \"saas-glitchtip/glitchtip-app-sre/default/app-sre-stage-01/glitchtip-stage\":\n        {\"commit_sha\": \"779b0ea1b74ec4aedacd9ea1473b1eede2458858\", \"deployment_state\": \"success\"},\n    \"saas-glitchtip/glitchtip-jira-bridge/default/appsres05ue1/glitchtip-jira-bridge-stage\":\n        {\"commit_sha\": \"0916d819fd6eb3697e335020ececa329124fc3cc\", \"deployment_state\": \"success\"},\n    \"saas-glitchtip-test/glitchtip/default/app-sre-stage-01/glitchtip-stage\":\n        {\"commit_sha\": \"779b0ea1b74ec4aedacd9ea1473b1eede2458858\", \"deployment_state\": \"success\"},\n    \"advisor/tasks-frontend/default/crcs02ue1/frontends\":\n        {\"commit_sha\": \"609601a4d595a9e338fb4c360638f826c30a3442\", \"deployment_state\": \"success\"},\n    \"advisor/advisor-backend/default/crcs02ue1/advisor-stage\":\n        {\"commit_sha\": \"d6064b5bbc0f5293d8c0496020c2b25cab2048ea\", \"deployment_state\": \"success\"},\n    \"advisor-test/advisor/default/crcs02ue1/advisor-stage\":\n        {\"commit_sha\": \"d6064b5bbc0f5293d8c0496020c2b25cab2048ea\", \"deployment_state\": \"success\"},\n    \"automation-hub-clowder/automation-hub/default/crcs02ue1/automation-hub-stage\":\n        {\"commit_sha\": \"67eab5426ad780f65a4e414484d93c1931e869cb\", \"deployment_state\": \"success\"},\n    \"ccx-data-pipeline-clowder/insights-aggregator-exporter/default/crcs02ue1/ccx-data-pipeline-stage\":\n        {\"commit_sha\": \"c26b30f5bf51cb0cd7231d84505bbd2555fdda86\", \"deployment_state\": \"success\"},\n    \"ccx-data-pipeline-clowder/insights-aggregator-exporter/default/crcp01ue1/ccx-data-pipeline-prod\":\n        {\"commit_sha\": \"e0398a583d16c292a79c90a6ccf5dbd361720087\", \"deployment_state\": \"success\"},\n    \"ccx-data-pipeline-clowder/insights-notification-db-exporter/default/crcs02ue1/ccx-data-pipeline-stage\":\n        {\"commit_sha\": \"c26b30f5bf51cb0cd7231d84505bbd2555fdda86\", \"deployment_state\": \"missing\"},\n    \"ccx-data-pipeline-clowder/insights-notification-db-exporter/default/crcp01ue1/ccx-data-pipeline-prod\":\n        {\"commit_sha\": \"e0398a583d16c292a79c90a6ccf5dbd361720087\", \"deployment_state\": \"missing\"},\n    \"cloudigrade-clowder/cloudigrade/default/crcs02ue1/cloudigrade-stage\":\n        {\"commit_sha\": \"5efa32871cb50b4b93a600a3e78bc0abd7690f30\", \"deployment_state\": \"success\"},\n    \"cloudigrade-clowder/postigrade/default/crcs02ue1/cloudigrade-stage\":\n        {\"commit_sha\": \"2043a8388c0808b2111419d0b19e6ac273d5db84\", \"deployment_state\": \"success\"},\n    \"cloudigrade-test/cloudigrade/default/crcs02ue1/cloudigrade-stage\":\n        {\"commit_sha\": \"5efa32871cb50b4b93a600a3e78bc0abd7690f30\", \"deployment_state\": \"success\"},\n    \"content-sources/content-sources-backend/default/crcs02ue1/content-sources-stage\":\n        {\"commit_sha\": \"2f10855f25eda7a214e3393e3d871724fa9c3117\", \"deployment_state\": \"success\"},\n    \"content-sources/content-sources-backend/default/crcp01ue1/content-sources-prod\":\n        {\"commit_sha\": \"6c94ea50a2709086166cfd2cdf91e29b4d40ebfa\", \"deployment_state\": \"success\"},\n    \"edge/edge-api/default/crcs02ue1/edge-stage\":\n        {\"commit_sha\": \"9008e1b5c65c8479fc0caa53118503975dd9b05f\", \"deployment_state\": \"success\"},\n    \"edge-test/edge/default/crcs02ue1/edge-stage\":\n        {\"commit_sha\": \"9008e1b5c65c8479fc0caa53118503975dd9b05f\", \"deployment_state\": \"success\"},\n    \"image-builder/image-builder/default/crcs02ue1/image-builder-stage\":\n        {\"commit_sha\": \"72cf9f579107f2885c157f57354ed52a43f7e9b4\", \"deployment_state\": \"success\"},\n    \"image-builder/image-builder/default/crcp01ue1/image-builder-prod\":\n        {\"commit_sha\": \"154e5e4c4da963a4583bc273976447561076d857\", \"deployment_state\": \"success\"},\n    \"image-builder/image-builder-frontend/default/crcs02ue1/frontends\":\n        {\"commit_sha\": \"6e1df015e1c83a94c984816155199461d74bc5b5\", \"deployment_state\": \"success\"},\n    \"image-builder/image-builder-frontend/default/crcp01ue1/frontends\":\n        {\"commit_sha\": \"45194fa225ea2afae4632d21d9d4021b6a4e57f9\", \"deployment_state\": \"success\"},\n    \"malware-detection/malware-detection/default/crcs02ue1/malware-detection-stage\":\n        {\"commit_sha\": \"f67389437914d87b52d8d7aba2f2d5f788ac67e5\", \"deployment_state\": \"success\"},\n    \"notifications-clowder/notifications-backend/default/crcs02ue1/notifications-stage\":\n        {\"commit_sha\": \"04090478ca07661634f6b8777fa4031d50c06fab\", \"deployment_state\": \"success\"},\n    \"notifications-clowder/notifications-connector-servicenow/default/crcs02ue1/notifications-stage\":\n        {\"commit_sha\": \"04090478ca07661634f6b8777fa4031d50c06fab\", \"deployment_state\": \"success\"},\n    \"notifications-clowder/notifications-connector-splunk/default/crcs02ue1/notifications-stage\":\n        {\"commit_sha\": \"04090478ca07661634f6b8777fa4031d50c06fab\", \"deployment_state\": \"success\"},\n    \"notifications-clowder/notifications-connector-webhook/default/crcs02ue1/notifications-stage\":\n        {\"commit_sha\": \"04090478ca07661634f6b8777fa4031d50c06fab\", \"deployment_state\": \"success\"},\n    \"notifications-clowder/notifications-engine/default/crcs02ue1/notifications-stage\":\n        {\"commit_sha\": \"04090478ca07661634f6b8777fa4031d50c06fab\", \"deployment_state\": \"success\"},\n    \"notifications-clowder/notifications-floorist/default/crcs02ue1/notifications-stage\":\n        {\"commit_sha\": \"04090478ca07661634f6b8777fa4031d50c06fab\", \"deployment_state\": \"success\"},\n    \"pdf-generator-clowder/pdf-generator/default/crcs02ue1/pdf-generator-stage\":\n        {\"commit_sha\": \"6ea17a237a6fec51de7611dc6b82f1260e0f984a\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-integration/osd-fleet-manager-integration-canary/app-sre-stage-01/osd-fleet-manager-integration\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-integration/osd-fleet-manager-integration-regional-ap-southeast-1/app-sre-stage-01/osd-fleet-manager-integration\":\n        {\"commit_sha\": \"72a931573ddda5d698ba14ccf50475fae867608f\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-integration/osd-fleet-manager-integration-main/app-sre-stage-01/osd-fleet-manager-integration\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-stage/osd-fleet-manager-stage-canary/app-sre-stage-01/osd-fleet-manager-stage\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-stage/osd-fleet-manager-stage-main/app-sre-stage-01/osd-fleet-manager-stage\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-west-2/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-4/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-us-east-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-west-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ca-central-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-northeast-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-3/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-southeast-2/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-ap-south-2/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-central-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-eu-south-1/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osd-fleet-manager/osd-fleet-manager-production/osd-fleet-manager-production-canary/app-sre-prod-04/osd-fleet-manager-production\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"success\"},\n    \"osdfm-qe-fvt-gating-tests/osd-fleet-manager/integration-main/app-sre-stage-01/osd-fleet-manager-integration\":\n        {\"commit_sha\": \"60279bb888252ecb3f80d16f476347379868dea1\", \"deployment_state\": \"missing\"}\n}";
// PIPELINE NODE MODEL APPROACH
var TASK_NODES = [
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
            status: react_topology_1.RunStatus.Succeeded,
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
            status: react_topology_1.RunStatus.Succeeded,
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
            status: react_topology_1.RunStatus.Succeeded,
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
var DataEdge = function (_a) {
    var element = _a.element, rest = __rest(_a, ["element"]);
    return (React.createElement(react_topology_1.DefaultEdge, __assign({ element: element, endTerminalType: react_topology_1.EdgeTerminalType.none }, rest)));
};
var DemoTaskNode = function (_a) {
    var element = _a.element;
    var data = element.getData();
    return (React.createElement(react_topology_1.TaskNode, { element: element, status: data === null || data === void 0 ? void 0 : data.status, toolTip: JSON.stringify(data), truncateLength: 120, badge: data['hash'].substring(0, 6) }));
};
var pipelineComponentFactory = function (kind, type) {
    if (kind === react_topology_1.ModelKind.graph) {
        return react_topology_1.GraphComponent;
    }
    switch (type) {
        case react_topology_1.DEFAULT_TASK_NODE_TYPE:
            return DemoTaskNode; // TODO: as far as I can assume all nodes should be this type <-
        case react_topology_1.DEFAULT_FINALLY_NODE_TYPE:
            return react_topology_1.FinallyNode;
        case 'task-group':
            return react_topology_1.DefaultTaskGroup;
        case 'finally-group':
            return react_topology_1.DefaultTaskGroup;
        case react_topology_1.DEFAULT_SPACER_NODE_TYPE:
            return react_topology_1.SpacerNode;
        case 'finally-spacer-edge':
        case react_topology_1.DEFAULT_EDGE_TYPE:
            return react_topology_1.TaskEdge;
        case 'data-edge':
            return DataEdge;
        case react_topology_1.ModelKind.edge:
            return DataEdge;
        default:
            return undefined;
    }
};
var PipelineTasks = function () {
    var controller = (0, react_topology_1.useVisualizationController)();
    React.useEffect(function () {
        controller.fromModel({
            graph: {
                id: 'g1',
                type: 'graph'
            },
            nodes: TASK_NODES
        }, false);
    }, [controller]);
    return (React.createElement(react_topology_1.TopologyView, null,
        React.createElement(react_topology_1.VisualizationSurface, null)));
};
exports.PipelineTasks = PipelineTasks;
exports.PipelineTasks.displayName = 'PipelineTasks';
var TopologyPipelinesGettingStartedDemo = function (_a) {
    var name = _a.name, nodeJSON = _a.nodeJSON, scale = _a.scale, scaleExtent = _a.scaleExtent;
    var _b = (0, pipeline_to_node_and_edge_1.buildNodeAndEdgeModels)({ pipelineNodes: (0, json_to_pipeline_1.buildPipelineNodelModel)(name, nodeJSON) }), nodes = _b.nodes, edges = _b.edges;
    var controller = new react_topology_1.Visualization();
    controller.setFitToScreenOnLayout(true);
    controller.registerComponentFactory(pipelineComponentFactory);
    controller.registerLayoutFactory(function (_type, graph) { return new react_topology_1.PipelineDagreLayout(graph); });
    var model = {
        nodes: nodes,
        edges: edges,
        graph: {
            id: 'g1',
            type: 'graph',
            layout: 'pipelineLayout',
            scale: scale,
            scaleExtent: scaleExtent
        }
    };
    controller.fromModel(model, false);
    return (React.createElement(react_topology_1.VisualizationProvider, { controller: controller },
        React.createElement(react_topology_1.VisualizationSurface, null)));
};
exports.TopologyPipelinesGettingStartedDemo = TopologyPipelinesGettingStartedDemo;
// Uncomment this to run standalone
// const container = document.getElementById("root");
// createRoot(container).render(<TopologyPipelinesGettingStartedDemo />);
