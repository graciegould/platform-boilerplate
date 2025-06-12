// Re-export all components for direct imports
export * from './components';

// Create a namespaced object for object-style imports
import * as components from './components';

const Ui = {
    components,
};

export default Ui;
