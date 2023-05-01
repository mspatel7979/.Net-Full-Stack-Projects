import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SendAndRequestComponent } from './send-and-request.component';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';


describe('SendAndRequestComponent', () => {
  let component: SendAndRequestComponent;
  let fixture: ComponentFixture<SendAndRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendAndRequestComponent ],
      imports : [HttpClientTestingModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAndRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
