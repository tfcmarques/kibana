/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { createContext, useContext } from 'react';
import type { FlyoutType } from '@kbn/unified-doc-viewer';

/**
 * Provides the {@link FlyoutType} of the topmost unified doc viewer flyout in
 * the React tree. Used to attach an originating flyout identifier (e.g.
 * `traces`, `logs`) to all `unified_doc_viewer_viewed` events emitted from
 * within that flyout, including events from nested surfaces such as the trace
 * timeline waterfall and the span/log child flyouts.
 *
 * The context is provided by `UnifiedDocViewerFlyout` and consumed by the
 * doc viewer hooks via `useDocViewerFlyoutType`.
 */
export const FlyoutTypeContext = createContext<FlyoutType | undefined>(undefined);

export const useDocViewerFlyoutType = () => {
  // Don't be strict: if the context wasn't provided, just return undefined.
  return useContext(FlyoutTypeContext);
};
