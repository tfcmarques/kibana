/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

export const DOC_VIEWER_VIEWED_EVENT_TYPE = 'unified_doc_viewer_viewed';
export const DOC_VIEWER_VIEWED_ROOT_CONTENT_ID = 'doc_detail';

/**
 * Identifies the originating flyout where a `unified_doc_viewer_viewed` event happened.
 *
 * The value is set by the consumer that opens the unified doc viewer flyout
 * (e.g. Discover) based on the resolved document profile, and is propagated to
 * any nested doc viewer surfaces (trace timeline, span/log child flyouts) so
 * that all events emitted while the user navigates within a given flyout share
 * the same `flyoutType`. This makes it possible to filter or group all views
 * originated from a given flyout in a single query.
 */
export enum FlyoutType {
  Traces = 'traces',
  Logs = 'logs',
  Security = 'security',
  Generic = 'generic',
  Default = 'default',
}
