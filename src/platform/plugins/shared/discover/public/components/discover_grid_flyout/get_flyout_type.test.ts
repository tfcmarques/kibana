/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { FlyoutType } from '@kbn/unified-doc-viewer';
import { getDataTableRecordMock } from '@kbn/discover-utils/src/__mocks__';
import { getFlyoutTypeFromRecord } from './get_flyout_type';
import { getDataTableRecordWithContextMock } from '../../context_awareness/__mocks__/data_table_record_with_context';
import { DocumentType } from '../../context_awareness';
import { SECURITY_PROFILE_ID } from '../../context_awareness/profile_providers/security/constants';

describe('getFlyoutTypeFromRecord', () => {
  it('returns Default when the record does not have a resolved context', () => {
    expect(getFlyoutTypeFromRecord(getDataTableRecordMock())).toBe(FlyoutType.Default);
  });

  it('maps DocumentType.Trace to FlyoutType.Traces', () => {
    const record = getDataTableRecordWithContextMock({
      context: { profileId: 'observability-traces-document-profile', type: DocumentType.Trace },
    });
    expect(getFlyoutTypeFromRecord(record)).toBe(FlyoutType.Traces);
  });

  it('maps DocumentType.Log to FlyoutType.Logs', () => {
    const record = getDataTableRecordWithContextMock({
      context: { profileId: 'observability-log-document-profile', type: DocumentType.Log },
    });
    expect(getFlyoutTypeFromRecord(record)).toBe(FlyoutType.Logs);
  });

  it('maps DocumentType.Generic to FlyoutType.Generic', () => {
    const record = getDataTableRecordWithContextMock({
      context: { profileId: 'observability-generic-document-profile', type: DocumentType.Generic },
    });
    expect(getFlyoutTypeFromRecord(record)).toBe(FlyoutType.Generic);
  });

  it('maps the security document profile to FlyoutType.Security', () => {
    const record = getDataTableRecordWithContextMock({
      context: { profileId: SECURITY_PROFILE_ID.document, type: DocumentType.Default },
    });
    expect(getFlyoutTypeFromRecord(record)).toBe(FlyoutType.Security);
  });

  it('maps the enhanced security document profile to FlyoutType.Security', () => {
    const record = getDataTableRecordWithContextMock({
      context: { profileId: SECURITY_PROFILE_ID.enhanced_document, type: DocumentType.Default },
    });
    expect(getFlyoutTypeFromRecord(record)).toBe(FlyoutType.Security);
  });

  it('falls back to FlyoutType.Default for unknown profiles', () => {
    const record = getDataTableRecordWithContextMock({
      context: { profileId: 'some-other-profile', type: DocumentType.Default },
    });
    expect(getFlyoutTypeFromRecord(record)).toBe(FlyoutType.Default);
  });
});
