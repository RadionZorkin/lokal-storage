import { common } from './common';
import { createMarkup } from './helpers/createMarkUp';
import { createModal } from './helpers/createModal';
import { tools } from './helpers/tools';

const list = document.querySelector('.js-list');
const favorite = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];

createMarkup(favorite, list);
removeButtons(list);

function removeButtons(list) {
  const cards = list.querySelectorAll('.js-card');
  cards.forEach(card => {
    const cardBtnBlock = card.querySelector('.js-btn-block');

    removeFavoriteButton(cardBtnBlock); // Видаляємо кнопку

    if (cardBtnBlock && !cardBtnBlock.querySelector('.js-remove')) {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('js-remove');
      cardBtnBlock.append(removeBtn);
      cardBtnBlock.querySelector('.js-favorite').remove();

      removeBtn.addEventListener('click', () => {
        const cardId = Number(card.dataset.id);
        removeFromFavorite(cardId);
        card.remove(); // Видалення картки зі списку
      });
    }
  });
}

function removeFromFavorite(id) {
  const updatedFavorite = favorite.filter(item => item.id !== id);
  localStorage.setItem(common.KEY_FAVORITE, JSON.stringify(updatedFavorite));

  favorite.length = 0;
  favorite.push(...updatedFavorite);
}

function removeFavoriteButton(cardBtnBlock) {
  const favoriteBtn = cardBtnBlock?.querySelector('js-favorite');
  if (favoriteBtn) {
    favoriteBtn.remove();
  }
}

list.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('js-info')) {
    const product = findProduct(evt.target);
    createModal(product);
  }
}

function findProduct(elem) {
  const productId = Number(elem.closest('.js-card').dataset.id);
  return tools.find(({ id }) => id === productId);
}
