/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { DataTableRecord } from '@kbn/discover-utils/types';
import { FlyoutType } from '@kbn/unified-doc-viewer';
import { recordHasContext } from '../../context_awareness/profiles_manager/record_has_context';
import { DocumentType } from '../../context_awareness';
import { SECURITY_PROFILE_ID } from '../../context_awareness/profile_providers/security/constants';

/**
 * Maps a Discover document profile to the originating {@link FlyoutType}
 * reported by the unified doc viewer analytics.
 *
 * The value identifies which surface a `unified_doc_viewer_viewed` event
 * originated from (e.g. `traces`, `logs`) so that nested doc viewer surfaces
 * (trace timeline, span/log child flyouts) inherit the parent flyout's
 * identity, regardless of the type of document currently being viewed.
 */
export const getFlyoutTypeFromRecord = (record: DataTableRecord): FlyoutType => {
  if (!recordHasContext(record)) {
    return FlyoutType.Default;
  }

  const { type, profileId } = record.context;

  switch (type) {
    case DocumentType.Trace:
      return FlyoutType.Traces;
    case DocumentType.Log:
      return FlyoutType.Logs;
    case DocumentType.Generic:
      return FlyoutType.Generic;
    case DocumentType.Default:
    default:
      // Security documents currently resolve to `DocumentType.Default`, so we
      // disambiguate them via `profileId`.
      if (
        profileId === SECURITY_PROFILE_ID.document ||
        profileId === SECURITY_PROFILE_ID.enhanced_document
      ) {
        return FlyoutType.Security;
      }
      return FlyoutType.Default;
  }
};
