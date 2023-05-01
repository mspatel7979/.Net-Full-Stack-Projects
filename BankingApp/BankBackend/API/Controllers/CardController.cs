using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using DataAccess;
using DataAccess.Entities;
using Services;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class CardController : ControllerBase {
        private readonly CardServices _repo;

        public CardController(CardServices repo) {
            this._repo = repo;
        }

        // create a card
        [HttpPost("Add")]
        public Card AddCard(Card card) {
            return _repo.AddCard(card);
        }

        [HttpGet("card/{id:int}")]
        public Card GetCardByID(int Id) {
            return _repo.GetCard(Id);
        }

        // delete a card
        [HttpDelete]
        public Card RemoveCard(Card card) {
            return _repo.RemoveCard(card);
        }

        [HttpGet("User")]
        public List<Card> GetCards(int userId) {
            return _repo.UserCards(userId);
        }

        [HttpGet("Business")]
        public List<Card> BusinessCards(int userId) {
            return _repo.BusinessCards(userId);
        }
        
    }

}