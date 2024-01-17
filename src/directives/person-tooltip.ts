import './person-tooltip.scss';
import { DirectiveBinding } from 'vue';

export default {
  mounted(element: HTMLElement, binding: DirectiveBinding) {
    // eslint-disable-next-line no-param-reassign
    element.onmouseover = (event) => {
      event.stopPropagation();

      const PersonTooltipSettings = {
        width: 300,
        height: 110,
        indentY: -90,
      };
      const coords: DOMRectReadOnly = element.getBoundingClientRect();
      const { clientWidth, clientHeight } = document.documentElement;
      const l = clientWidth < PersonTooltipSettings.width
        ? `${document.documentElement.clientWidth - PersonTooltipSettings.width}px`
        : `${coords.x}px`;
      const t = clientHeight < PersonTooltipSettings.height
        ? `${coords.y - clientHeight - PersonTooltipSettings.indentY}px`
        : `${coords.y + coords.height + PersonTooltipSettings.indentY}px`;

      const {
        city,
        id,
        img,
        name,
        position,
      } = binding.value;

      const tooltip = `<div class="person-tooltip" style="top:${t};left:${l}" id="tooltip-${id}${coords.x}${coords.y}">
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

      const tooltipElement = document.getElementById(`tooltip-${id}${coords.x}${coords.y}`) as HTMLElement;
      const removeTooltip = () => {
        tooltipElement.remove();
        document.removeEventListener('mouseover', removeTooltip);
      };

      tooltipElement.onmouseover = (e) => e.stopPropagation();
      tooltipElement.onmouseleave = () => tooltipElement.remove();

      document.addEventListener('mouseover', removeTooltip);
    };
  },
};
