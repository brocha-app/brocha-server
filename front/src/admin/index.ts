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

import 'focus-visible';
import '../translate';
import Root from './Admin.svelte';
import './translations';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  Title,
  Legend,
  Tooltip,
  LinearScale,
  TimeScale,
  Filler,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, Title, Legend, Tooltip, LinearScale, TimeScale, Filler);

import 'chartjs-adapter-date-fns';

const root = new Root({
  target: document.body,
});

export default root;
