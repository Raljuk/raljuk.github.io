import './person-tooltip.scss';
import { DirectiveBinding } from 'vue';

export default {
  mounted(element: HTMLElement, binding: DirectiveBinding) {
    // eslint-disable-next-line no-param-reassign
    element.onmouseover = () => {
      const PersonTooltip = {
        width: 300,
        height: 110,
        indentY: 10,
      };
      const coords: DOMRectReadOnly = element.getBoundingClientRect();
      const { clientWidth, clientHeight } = document.documentElement;
      const l = clientWidth < PersonTooltip.width
        ? `${document.documentElement.clientWidth - PersonTooltip.width}px`
        : `${coords.x}px`;
      const t = clientHeight < PersonTooltip.height
        ? `${coords.y - clientHeight - PersonTooltip.indentY}px`
        : `${coords.y + coords.height + PersonTooltip.indentY}px`;

      const {
        city,
        img,
        name,
        position,
      } = binding.value;

      const tooltip = `<div class="person-tooltip" style="top:${t};left:${l}">
        <div class="tooltipContent">

          <img
            class="photo"
            src="${img}"
            alt="person"
          />

          <div>

            <div>
              ${name}
            </div>

            <div class="position">
              ${position}
            </div>

            <div class="position">
              ${city}
            </div>

          </div>

        </div>
      </div>`;

      document.body.insertAdjacentHTML('beforeend', tooltip);

      // eslint-disable-next-line no-param-reassign
      element.onmouseout = () => {
        document.querySelector('.person-tooltip')!.remove();
      };
    };
  },
};
