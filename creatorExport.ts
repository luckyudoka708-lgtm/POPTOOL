import type {CreatorSession} from '../context/LocaleContext';
import {formatBytes} from './fileUtils';

export interface DownloadArchiveResult {
  filename: string;
  fileCount: string | null;
  sizeLabel: string | null;
}

export class CreatorAuthExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreatorAuthExpiredError';
  }
}

function triggerCrossDeviceBlobDownload(blob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.rel = 'noopener';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 15000);
}

export async function downloadCreatorSourceArchive(
  session: CreatorSession,
): Promise<DownloadArchiveResult> {
  const res = await fetch(session.archiveEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'X-Requested-With': 'POPTOOLS',
    },
  });

  if (!res.ok) {
    let errorMessage = 'Failed to package and download website source code.';
    try {
      const errJson = (await res.json()) as {error?: string};
      if (errJson.error) errorMessage = errJson.error;
    } catch {
      // Keep fallback message
    }
    if (res.status === 401 || res.status === 403) {
      throw new CreatorAuthExpiredError(errorMessage);
    }
    throw new Error(errorMessage);
  }

  const blob = await res.blob();
  const filename =
    res.headers.get('X-Archive-Filename') ||
    `poptools-source-${new Date().toISOString().slice(0, 10)}.zip`;
  const fileCount = res.headers.get('X-Archive-File-Count');
  const sizeLabel = blob.size > 0 ? formatBytes(blob.size) : null;

  triggerCrossDeviceBlobDownload(blob, filename);

  return {filename, fileCount, sizeLabel};
}

export async function logoutCreatorSession(session: CreatorSession): Promise<void> {
  try {
    await fetch('/api/creator/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.token}`,
        'X-Requested-With': 'POPTOOLS',
      },
    });
  } catch {
    // Clear memory session regardless of network errors
  }
}
