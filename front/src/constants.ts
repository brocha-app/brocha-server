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


/**
 * UUID string matcher
 */
export const UUID_REGEX = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/;

// rct.h room flags
export const RCT_ROOM_MEETING = 0x01;
export const RCT_ROOM_WEBINAR = 0x02;
export const RCT_ROOM_PRIVATE = 0x04;
export const RCT_ROOM_ALO = 0x08;

export const RTP_KIND_VIDEO = 0x01; // see rct_producer.h
export const RTP_KIND_AUDIO = 0x02; // see rct_producer.h

export const MRES_SEND_TRANSPORT = 0x01; // rct_room.c
export const MRES_RECV_TRANSPORT = 0x02; // rct_room.c

// rct.h types
export const RCT_TYPE_ROUTER = 0x01;
export const RCT_TYPE_TRANSPORT_WEBRTC = 0x02;
export const RCT_TYPE_TRANSPORT_PLAIN = 0x04;
export const RCT_TYPE_TRANSPORT_DIRECT = 0x08;
export const RCT_TYPE_TRANSPORT_PIPE = 0x10;
export const RCT_TYPE_PRODUCER = 0x20;
export const RCT_TYPE_PRODUCER_DATA = 0x40;
export const RCT_TYPE_CONSUMER = 0x80;
export const RCT_TYPE_CONSUMER_DATA = 0x100;
export const RCT_TYPE_ROOM = 0x200;
export const RCT_TYPE_ROOM_MEMBER = 0x400;
