/*
 * Copyright (C) 2023 Tulio Technologies LLC.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 */

import { writable } from 'svelte/store';
import { makeStoreAsPersistent } from './db';
import type { NU, RoomHistoryEntry } from './interfaces';

let userSnapshot: User | undefined = undefined;

export interface SystemSettings {
  alo_threshold: number; // Audio level observer threshold dB
  alo_interval: number; // Audio level observer poll interval
  max_upload_size: number; // Maximum uploading file size
}

export interface UserSpec {
  name: string;
  perms: string;
  system: SystemSettings;
  rooms: RoomHistoryEntry[];
}

export class User {
  readonly name: string;
  readonly perms: string[];
  readonly system: SystemSettings;
  readonly rooms: RoomHistoryEntry[];

  hasAnyPerms(...perms: string[]): boolean {
    for (let i = 0; i < perms.length; ++i) {
      if (this.perms.indexOf(perms[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  addRoomHistoryEntry(item: RoomHistoryEntry) {
    const idx = this.rooms.findIndex((r) => r.uuid === item.uuid);
    if (idx !== -1) {
      this.rooms.splice(idx, 1);
    }
    this.rooms.unshift(item);
  }

  constructor(json: UserSpec) {
    this.name = json.name;
    this.perms = (<string | NU>json.perms || '').split(',').map((s) => s.trim());
    this.system = json.system;
    this.rooms = Array.isArray(json.rooms) ? json.rooms : [];
  }
}

export const user = writable<User | undefined>(undefined);

user.subscribe((u) => {
  userSnapshot = u;
});

export function getUserSnapshot(): typeof userSnapshot {
  return userSnapshot;
}

export const nickname = writable<string>('');
makeStoreAsPersistent('nickname', nickname);
