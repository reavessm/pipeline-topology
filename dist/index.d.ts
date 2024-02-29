import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';
import './pipeline-styles.css';
import '@patternfly/react-topology/patternfly-docs/content/examples/./topology-pipelines-example.css';
import * as React from 'react';
import { PipelineNodeModel } from '@patternfly/react-topology';
export declare const PipelineTasks: React.FC;
interface TopologyProps {
    nodeModel: PipelineNodeModel[];
}
export declare const TopologyPipelinesGettingStartedDemo: React.FunctionComponent<TopologyProps>;
export {};
